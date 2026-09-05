"use client";

import { useState } from "react";
import {
    Project,
    ProjectCategory,
    getProjectNumber,
    projectCategories,
    projects,
} from "../data/portfolio";

type ProjectArchiveProps = {
    onOpenTerminal: (command: string) => void;
};

type SortOrder = "newest-to-oldest" | "oldest-to-newest";

function ProjectCard({
    project,
    onOpenTerminal,
}: {
    project: Project;
    onOpenTerminal: (command: string) => void;
}) {
    return (
        <article className={`project-card accent-${project.accent}`}>
            <header>
                <span>{getProjectNumber(project)}</span>
                <p>
                    {project.category} / {project.year}
                </p>
                <b>{project.status}</b>
            </header>
            <div className="project-card-body">
                <p className="project-context">{project.team}</p>
                <h3>{project.title}</h3>
                <p className="project-card-summary">{project.summary}</p>

                <div
                    className="learning-delta"
                    aria-label="Learning progression"
                >
                    <div>
                        <small>STARTED WITH</small>
                        <span>{project.startedWith}</span>
                    </div>
                    <i aria-hidden="true">-&gt;</i>
                    <div>
                        <small>LEFT WITH</small>
                        <span>{project.learned}</span>
                    </div>
                </div>

                <details>
                    <summary>
                        <span>Open build notes</span>
                        <b aria-hidden="true">+</b>
                    </summary>
                    <dl className="project-detail-grid">
                        <div>
                            <dt>WHAT I BUILT</dt>
                            <dd>{project.built}</dd>
                        </div>
                        <div>
                            <dt>WHY</dt>
                            <dd>{project.reason}</dd>
                        </div>
                        <div>
                            <dt>HARDEST PART</dt>
                            <dd>{project.challenge}</dd>
                        </div>
                        <div>
                            <dt>OUTCOME</dt>
                            <dd>{project.outcome}</dd>
                        </div>
                    </dl>
                </details>

                <ul
                    className="stack-list"
                    aria-label={`${project.title} technologies`}
                >
                    {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <button
                className="card-terminal-link"
                onClick={() => onOpenTerminal(`cat ${project.slug}`)}
            >
                <span>&gt;_ cat {project.slug}</span>
                <span>CLI</span>
            </button>
        </article>
    );
}

export function ProjectArchive({ onOpenTerminal }: ProjectArchiveProps) {
    const archiveProjects = projects;
    const [activeCategory, setActiveCategory] =
        useState<(typeof projectCategories)[number]>("All");
    const [showAll, setShowAll] = useState(false);
    const [sortOrder, setSortOrder] = useState<SortOrder>("newest-to-oldest");

    const filteredProjects =
        activeCategory === "All"
            ? archiveProjects
            : archiveProjects.filter(
                  (project) =>
                      project.category === (activeCategory as ProjectCategory),
              );

    const orderedProjects = [...filteredProjects].sort((first, second) =>
        sortOrder === "newest-to-oldest"
            ? second.buildOrder - first.buildOrder
            : first.buildOrder - second.buildOrder,
    );

    const visibleProjects =
        activeCategory === "All" && !showAll
            ? orderedProjects.slice(0, 6)
            : orderedProjects;

    return (
        <div className="project-archive">
            <div className="archive-heading">
                <div>
                    <p>
                        PROJECT INDEX / {projects.length} BUILDS /{" "}
                        {sortOrder === "newest-to-oldest"
                            ? "NEWEST TO OLDEST"
                            : "OLDEST TO NEWEST"}
                    </p>
                    <h3>The trail, not just the trophies.</h3>
                </div>
                <p>
                    Filter by the kind of problem. Open only the build notes you
                    want. Every card comes from the same typed data file that
                    powers the terminal.
                </p>
            </div>

            <div className="project-filterbar" aria-label="Filter projects">
                {projectCategories.map((category) => {
                    const count =
                        category === "All"
                            ? archiveProjects.length
                            : archiveProjects.filter(
                                  (project) => project.category === category,
                              ).length;
                    if (category !== "All" && count === 0) return null;
                    return (
                        <button
                            key={category}
                            aria-pressed={activeCategory === category}
                            onClick={() => {
                                setActiveCategory(category);
                                setShowAll(category !== "All");
                            }}
                        >
                            <span>{category}</span>
                            <small>{String(count).padStart(2, "0")}</small>
                        </button>
                    );
                })}
                <div
                    className="mode-switch project-sort-switch"
                    aria-label="Project display order"
                >
                    <button
                        type="button"
                        className={
                            sortOrder === "newest-to-oldest" ? "active" : ""
                        }
                        aria-pressed={sortOrder === "newest-to-oldest"}
                        onClick={() => setSortOrder("newest-to-oldest")}
                    >
                        LATEST
                    </button>

                    <button
                        type="button"
                        className={
                            sortOrder === "oldest-to-newest" ? "active" : ""
                        }
                        aria-pressed={sortOrder === "oldest-to-newest"}
                        onClick={() => setSortOrder("oldest-to-newest")}
                    >
                        EARLIEST
                    </button>
                </div>
            </div>

            <p className="sr-only" aria-live="polite">
                Showing {visibleProjects.length} projects
            </p>
            <div className="project-grid">
                {visibleProjects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        onOpenTerminal={onOpenTerminal}
                    />
                ))}
            </div>

            {activeCategory === "All" && filteredProjects.length > 6 && (
                <button
                    className="show-all-projects"
                    onClick={() => setShowAll((current) => !current)}
                >
                    <span>
                        {showAll
                            ? "Show the concise edit"
                            : `Show all ${filteredProjects.length} archive projects`}
                    </span>
                    <b aria-hidden="true">{showAll ? "-" : "+"}</b>
                </button>
            )}
        </div>
    );
}
