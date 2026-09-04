// This file is the portfolio's content source of truth.
// Add, remove, or reorder projects here; the GUI, filters, and CLI update automatically.

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const projectCategories = [
    "All",
    "Software",
    "Systems",
    "AI & Research",
    "Robotics",
    "Creative",
] as const;

export type ProjectCategory = Exclude<
    (typeof projectCategories)[number],
    "All"
>;
export type Accent = "vermilion" | "indigo" | "peacock" | "marigold" | "gulal";

export type Project = {
    slug: string;
    title: string;
    shortTitle: string;
    buildOrder: number;
    year: string;
    category: ProjectCategory;
    accent: Accent;
    status: string;
    team: string;
    summary: string;
    built: string;
    reason: string;
    startedWith: string;
    learned: string;
    challenge: string;
    outcome: string;
    stack: string[];
    featured?: boolean;
};

export const profile = {
    name: "Aryan Vekariya",
    shortName: "Aryan",
    handle: "aryan@av-dos",
    location: "Winnipeg, Canada",
    email: "vekariyaaryan100@gmail.com",
    github: "https://github.com/Aryan0826",
    linkedin: "https://www.linkedin.com/in/aryan-vekariya-b66663262/",
    resumeUrl: `${publicBasePath}/AryanVekariya-Resume.pdf`,
    headline:
        "Computer Science student building across software, systems, and robotics.",
    intro: "I learn by building: entering unfamiliar territory, finding the fundamentals, and carrying each hard-won lesson into the next system.",
    education: {
        institution: "University of Manitoba",
        degree: "B.Sc. Computer Science (Honours)",
        minor: "Minor in Mathematics",
        period: "2023 - Present",
        gpa: "4.33 / 4.5",
    },
};

const projectCatalog: Project[] = [
    {
        slug: "cyber-sentinel",
        title: "CyberSentinel",
        shortTitle: "CyberSentinel",
        buildOrder: 6,
        year: "2025",
        category: "Software",
        accent: "vermilion",
        status: "DEPLOYED / TEAM OF 2",
        team: "Team of 2",
        summary:
            "A Chrome extension and companion dashboard that turn link and email threat signals into an understandable Safe/Risky decision.",
        built: "A browser extension, responsive web dashboard, and Python/Flask backend using the VirusTotal API, SSL certificate checks, and an Express service.",
        reason: "Security data is only useful when a person can understand it before trusting a link.",
        startedWith: "Python and web-development fundamentals",
        learned:
            "Browser extensions, threat-intelligence APIs, SSL signals, and cross-service design",
        challenge:
            "Coordinating an extension, dashboard, and multiple backend technologies while keeping the risk explanation clear and privacy-minded.",
        outcome:
            "Built and deployed a working security tool across browser and web surfaces, with clear threat detail for the person making the decision.",
        stack: [
            "Python",
            "Flask",
            "Node.js",
            "Express",
            "JavaScript",
            "VirusTotal API",
        ],
        featured: true,
    },
    {
        slug: "teleoperation-macros-research",
        title: "Reusable Motion Macros for Robot Teleoperation",
        shortTitle: "Teleoperation Research",
        buildOrder: 2,
        year: "Summer 2026",
        category: "AI & Research",
        accent: "indigo",
        status: "SUMMER RESEARCH ASSISTANTSHIP",
        team: "Supervised by Dr. Daniel Rea",
        summary:
            "An HCI research project investigating whether reusable movements and predefined move-sets can make robot teleoperation more expressive and practical.",
        built: "A research plan spanning robotic-system configuration, ethics materials, participant recruitment, experiment and workshop design, and qualitative data collection.",
        reason: "Continuous manual control is not always the most natural way for people to direct a robot.",
        startedWith: "Hands-on robotics setup and software prototyping",
        learned:
            "Research questions, ethics, user studies, qualitative methods, and experimental design",
        challenge:
            "Connecting a technically reliable robot-control system to a study that can reveal how people actually want to interact with it.",
        outcome:
            "Connected prior work in robotics, interfaces, software engineering, and human behaviour into one academic research direction.",
        stack: [
            "HCI",
            "Robotics",
            "User Studies",
            "Research Design",
            "Qualitative Analysis",
        ],
    },
    {
        slug: "robot-learning-stack",
        title: "Robot Learning & Teleoperation Stack",
        shortTitle: "Robot Learning Stack",
        buildOrder: 3,
        year: "2025-26",
        category: "Robotics",
        accent: "peacock",
        status: "HARDWARE + SOFTWARE",
        team: "Independent robotics work",
        summary:
            "A cross-platform robotics environment for configuring, calibrating, teleoperating, and troubleshooting real robotic arms.",
        built: "ROS 2 and Docker environments across Ubuntu and Windows for Kinova Gen3 Lite and SO-ARM101 hardware, including LeRobot tooling, cameras, USB devices, and motor configuration.",
        reason: "Robotics offered a way to test software decisions against the unpredictability of the physical world.",
        startedWith:
            "Software development without deep hardware integration experience",
        learned:
            "ROS 2, Linux device layers, robot calibration, teleoperation, drivers, and hardware debugging",
        challenge:
            "Diagnosing failures across operating systems, containers, Python environments, device permissions, motors, sensors, and real hardware.",
        outcome:
            "Developed a layered debugging approach for systems where software, operating systems, and hardware fail in different ways.",
        stack: [
            "ROS 2",
            "Docker",
            "Ubuntu",
            "Python",
            "Kinova Gen3 Lite",
            "LeRobot",
            "SO-ARM101",
        ],
    },
    {
        slug: "studyflow",
        title: "StudyFlow",
        shortTitle: "StudyFlow",
        buildOrder: 11,
        year: "University Project",
        category: "Software",
        accent: "marigold",
        status: "TEAM SOFTWARE",
        team: "Collaborative Android project",
        summary:
            "An Android study-planning application that moved my thinking from individual classes toward maintainable application architecture.",
        built: "A layered Java application with repository and service patterns, SQLite persistence, calendar functionality, automated tests, Mockito, and Android integration testing.",
        reason: "To understand how a real application grows beyond isolated pieces of code without becoming difficult to change or test.",
        startedWith: "Java and object-oriented programming",
        learned:
            "Layered architecture, repositories, service boundaries, persistence, testing, and GitLab teamwork",
        challenge:
            "Keeping calendar, data, and service behaviour modular enough to test while several people developed the system together.",
        outcome:
            'Shifted my definition of working software from "it runs" to "it can be understood, tested, and changed."',
        stack: [
            "Java",
            "Android",
            "SQLite",
            "Mockito",
            "Integration Testing",
            "GitLab",
        ],
    },
    {
        slug: "distributed-consensus",
        title: "Distributed Consensus Network",
        shortTitle: "Consensus Network",
        buildOrder: 4,
        year: "Distributed Computing Coursework",
        category: "Systems",
        accent: "gulal",
        status: "BYZANTINE CONSENSUS",
        team: "University systems project",

        summary:
            "A multi-node peer-to-peer network built in Python to explore how independent computers agree on shared data even when some nodes are unresponsive or intentionally lying.",
        built: "A peer-to-peer system featuring a UDP gossip protocol for node discovery, TCP sockets for client commands, a 67% quorum rule, smart timeouts, and a simulator for 'bad' nodes that intentionally broadcast fake data.",
        reason: "To understand the chaotic nature of distributed networks and learn how independent computers can securely reach an agreement without relying on a central server.",
        startedWith:
            "Basic Python syntax and zero prior experience with sockets, networking, or TCP/UDP communication.",
        learned:
            "Socket programming, managing concurrent TCP/UDP traffic, the Oral Messages algorithm, failure handling, and how modern distributed systems operate.",
        challenge:
            "Coordinating information across multiple independent nodes while juggling concurrent network traffic, handling unresponsive peers, and building a system that doesn't freeze when nodes disappear.",
        outcome:
            "Developed a resilient distributed network that dynamically scales its fault tolerance, gracefully handles timeouts, filters out malicious lies, and safely commits truth to a shared database.",

        stack: ["Python", "TCP", "UDP", "Sockets", "select()", "JSON"],
    },
    {
        slug: "fat32-reader",
        title: "FAT32 Filesystem Reader",
        shortTitle: "FAT32 Reader",
        buildOrder: 5,
        year: "Systems Coursework",
        category: "Systems",
        accent: "indigo",
        status: "LOW-LEVEL SYSTEMS",
        team: "Individual coursework",
        summary:
            "A filesystem reader that inspects and retrieves data directly from a FAT32 disk image.",
        built: "Commands for reading filesystem information, calculating usable and free space, traversing directories, and retrieving files from raw disk structures.",
        reason: "To replace the filesystem abstraction with a concrete understanding of how bytes, clusters, and directories are represented.",
        startedWith: "C programming and memory-management fundamentals",
        learned:
            "FAT32 layout, binary structures, directory traversal, caching, profiling, and defensive parsing",
        challenge:
            "Translating low-level on-disk structures into safe navigation and retrieval logic without higher-level filesystem APIs.",
        outcome:
            "Built a clearer mental model of what an operating system is doing underneath an ordinary file operation.",
        stack: ["C", "FAT32", "Memory Management", "Caching", "gprof"],
    },
    {
        slug: "cooked",
        title: "Cooked",
        shortTitle: "Cooked",
        buildOrder: 12,
        year: "2024",
        category: "Creative",
        accent: "vermilion",
        status: "PEOPLE'S CHOICE",
        team: "Team of 5 / 48-hour game jam",
        summary:
            "A game built by five first-time game developers in 48 hours - and chosen as the audience favourite.",
        built: "Gameplay systems and a complete jam-ready experience using Godot, GDScript, Blender, and Git.",
        reason: "To learn a completely different kind of development by making something tangible under a hard deadline.",
        startedWith:
            "General programming experience, but no team game-development workflow",
        learned:
            "Game engines, visual iteration, scope control, Git collaboration, and rapid decision-making",
        challenge:
            "Turning five first-time contributors into a coordinated team while protecting a playable core from the pressure to add more.",
        outcome:
            "Won the Game Jam People's Choice Award and proved how quickly a team can learn when the goal is concrete.",
        stack: ["Godot", "GDScript", "Blender", "Git", "Rapid Prototyping"],
    },
    {
        slug: "hack-a-judge",
        title: "HackAJudge",
        shortTitle: "HackAJudge",
        buildOrder: 10,
        year: "2025",
        category: "Software",
        accent: "marigold",
        status: "24-HOUR HACKATHON",
        team: "Team of 3",
        summary:
            "A web platform that lets judges score hackathon projects and updates a live leaderboard.",
        built: "A Flask application with project grading, dynamic leaderboard updates, Bootstrap UI, and a shared Git workflow.",
        reason: "To turn a real hackathon coordination problem into a working product inside one day.",
        startedWith: "Python and early web-development experience",
        learned:
            "Rapid product scoping, Git-based teamwork, live data flows, and deadline-driven delivery",
        challenge:
            "Choosing the smallest useful product, shipping it in 24 hours, and helping first-time collaborators use Git effectively.",
        outcome:
            "Delivered a working judging workflow and introduced teammates to practical version control.",
        stack: [
            "Python",
            "Flask",
            "JavaScript",
            "Bootstrap",
            "HTML/CSS",
            "Git",
        ],
    },
    {
        slug: "how-neural-networks-see",
        title: "How Neural Networks See",
        shortTitle: "How Neural Networks See",
        buildOrder: 8,
        year: "AI Coursework",
        category: "AI & Research",
        accent: "peacock",
        status: "RESEARCH REPORT",
        team: "Independent academic work",
        summary:
            "A research report exploring what convolutional neural networks preserve, discard, and reveal inside their internal representations.",
        built: "A technical synthesis of CNN representations, information-bottleneck ideas, and interpretability methods such as Grad-CAM.",
        reason: "To move beyond using an AI model and ask what its internal representations can actually tell us.",
        startedWith: "Foundational neural-network concepts",
        learned:
            "CNN representation analysis, interpretability, Grad-CAM, and research communication",
        challenge:
            "Connecting mathematical intuition, visual explanations, and competing interpretations without overstating what a visualization proves.",
        outcome:
            "Built a more critical understanding of model interpretability and the difference between a compelling image and a valid explanation.",
        stack: [
            "CNNs",
            "Grad-CAM",
            "Information Bottleneck",
            "Technical Writing",
        ],
    },
    {
        slug: "badminton-expert-system",
        title: "Badminton Shot Expert System",
        shortTitle: "Badminton Expert System",
        buildOrder: 9,
        year: "AI Coursework",
        category: "AI & Research",
        accent: "marigold",
        status: "SYMBOLIC AI",
        team: "Logic-programming project",
        summary:
            "A Prolog knowledge base and rule-driven system that recommends a badminton shot from the current playing situation.",
        built: "Facts, relationships, and inference rules that turn court conditions into an expert-style recommendation.",
        reason: "To explore intelligence as explicit knowledge and reasoning rather than statistical pattern learning.",
        startedWith: "Imperative and object-oriented programming",
        learned:
            "Declarative programming, knowledge representation, unification, and rule-based reasoning",
        challenge:
            "Expressing domain knowledge as general rules without creating contradictory or overly narrow recommendations.",
        outcome:
            "Provided a direct contrast with neural networks: one approach learns representations, while another makes its reasoning rules explicit.",
        stack: [
            "Prolog",
            "Knowledge Bases",
            "Logic Programming",
            "Symbolic AI",
        ],
    },
    {
        slug: "discord-verification-bot",
        title: "BookClub Verification Bot",
        shortTitle: "Verification Bot",
        buildOrder: 7,
        year: "2025",
        category: "Software",
        accent: "indigo",
        status: "DEPLOYED",
        team: "Community project",
        summary:
            "A deployed Discord bot that automates member verification and helps block spam accounts for a university community.",
        built: "A discord.py service with real-time validation, API-driven role assignment, and continuous deployment on Railway.",
        reason: "To replace repetitive manual verification with a consistent, safer community workflow.",
        startedWith: "Python scripting",
        learned:
            "Discord APIs, event-driven services, secure role workflows, and cloud deployment",
        challenge:
            "Automating access without creating an easy path for spam accounts or an unnecessary burden for real members.",
        outcome:
            "Deployed a practical tool that supports day-to-day operation of the University of Manitoba Book Club server.",
        stack: ["Python", "discord.py", "Railway", "APIs"],
    },
    {
        slug: "av-dos",
        title: "AV-DOS",
        shortTitle: "AV-DOS",
        buildOrder: 1,
        year: "2026",
        category: "Creative",
        accent: "gulal",
        status: "BUILDING NOW",
        team: "Personal project",
        summary:
            "This portfolio: a personal operating system with a calm GUI and a command line that tell the same story in different ways.",
        built: "A responsive, accessible portfolio with a data-driven project archive, keyboard navigation, CLI commands, themes, and an Indian print-inspired visual language.",
        reason: "A portfolio should demonstrate how I think, not merely list the things I have made.",
        startedWith:
            "A vague idea for a website that felt like a personalized operating system",
        learned:
            "Information architecture, progressive disclosure, interaction design, and disciplined visual systems",
        challenge:
            "Making the experience memorable without turning the operating-system metaphor into a maze.",
        outcome:
            "Created a living home for the full learning journey, designed to grow one data entry at a time.",
        stack: ["React", "TypeScript", "Next.js", "CSS", "Interaction Design"],
    },
];

// Build log order is intentionally newest-to-oldest so the numbering tells the
// growth story consistently in the GUI, filters, and terminal.
export const projects: Project[] = [...projectCatalog].sort(
    (first, second) => first.buildOrder - second.buildOrder,
);

export const featuredProject =
    projects.find((project) => project.featured) ?? projects[0];

export function getProjectNumber(project: Project) {
    return String(project.buildOrder).padStart(2, "0");
}

export type JourneyMilestone = {
    year: string;
    label: string;
    title: string;
    copy: string;
    note: string;
    signals: string[];
};

export const journey: JourneyMilestone[] = [
    {
        year: "2023",
        label: "FOUNDATIONS",
        title: "Learning the grammar of computing",
        copy: "I began Computer Science at the University of Manitoba with programming, algorithms, mathematics, and software-development fundamentals. Java gave me a starting language; every assignment gave me a new kind of mistake to understand.",
        note: "Shift: from no prior roadmap to a repeatable way of learning.",
        signals: ["Java", "Algorithms", "Mathematics", "Problem Solving"],
    },
    {
        year: "2024",
        label: "BUILDING WITH OTHERS",
        title: "Code became a team sport",
        copy: "Web experiments, CSSA contributions, and a 48-hour game jam pushed me beyond solo assignments. Cooked won the People's Choice Award, but the lasting lesson was how scope, communication, and version control shape a team.",
        note: "Shift: from writing programs to shipping a shared experience.",
        signals: ["Git", "Godot", "Web Development", "Teamwork"],
    },
    {
        year: "2025",
        label: "SYSTEMS EXPANSION",
        title: "Applications, networks, data, and machines",
        copy: "StudyFlow introduced architecture and testing; CyberSentinel made APIs and security tangible; systems projects moved into C, filesystems, networking, and distributed consensus. Robotics, UMSATS, teaching, and community software widened the frame again.",
        note: "Shift: from “does it work?” to “how does the whole system behave?”",
        signals: ["Testing", "Distributed Systems", "Databases", "Robotics"],
    },
    {
        year: "2026",
        label: "ROBOTICS IN PRACTICE",
        title: "Software met the physical world",
        copy: "Hands-on work with ROS 2, Docker, Linux, Kinova, and LeRobot moved debugging beyond the screen. Devices, calibration, permissions, drivers, and real hardware made every layer visible.",
        note: "Shift: from debugging software in isolation to tracing failures across hardware and software.",
        signals: ["ROS 2", "Docker", "Linux", "Robot Hardware"],
    },
];

export const principles = [
    {
        number: "01",
        title: "Understand before decorating.",
        copy: "The interface should make the idea clearer, not merely louder.",
    },
    {
        number: "02",
        title: "Make it humane.",
        copy: "Good software respects attention, different devices, and different ways of navigating.",
    },
    {
        number: "03",
        title: "Show the thinking.",
        copy: "A screenshot matters less than the choices, trade-offs, and lessons behind it.",
    },
    {
        number: "04",
        title: "Leave it clearer.",
        copy: "Code, copy, and systems should be easier for the next person to understand - including future me.",
    },
];

export const skillDomains = [
    {
        title: "Applications",
        evidence:
            "StudyFlow, CyberSentinel, HackAJudge, and deployed community tools",
        skills: [
            "Java",
            "Python",
            "JavaScript/TypeScript",
            "React",
            "Flask",
            "Node.js",
            "Android",
        ],
    },
    {
        title: "Systems & Networks",
        evidence:
            "FAT32 parsing, processes, threads, sockets, and distributed consensus",
        skills: [
            "C",
            "C++",
            "Bash",
            "LC-3 Assembly",
            "TCP/UDP",
            "Memory",
            "Synchronization",
        ],
    },
    {
        title: "Data & Intelligence",
        evidence:
            "Relational and graph data, symbolic reasoning, and neural-network interpretability",
        skills: [
            "SQLite",
            "SQL Server",
            "PostgreSQL",
            "Neo4j",
            "R",
            "Prolog",
            "CNNs",
        ],
    },
    {
        title: "Robotics & Hardware",
        evidence:
            "Real robot setup, teleoperation, calibration, and cross-platform hardware/software debugging",
        skills: [
            "ROS 2",
            "Docker",
            "Ubuntu",
            "Kinova",
            "LeRobot",
            "Device Integration",
            "Hardware Debugging",
        ],
    },
];

export const experience = [
    {
        period: "2025 - Present",
        role: "Course Instructor",
        place: "UCMAS Winnipeg",
        summary:
            "Teach certified abacus and mental-math training to students aged 5-13, translating complex processes into steps that different learners can internalize.",
    },
    {
        period: "Summer 2026",
        role: "Summer Research Assistant",
        place: "University of Manitoba",
        summary:
            "Investigated reusable motion macros for robot teleoperation under the supervision of Dr. Daniel Rea.",
    },
];

export const communities = [
    {
        name: "Computer Science Students' Association",
        period: "2024 - Present",
        contribution:
            "Website and event-management software, technical planning, and team collaboration.",
    },
    {
        name: "University of Manitoba Robotics Club",
        period: "2025 - Present",
        contribution:
            "Embedded-systems discussions, component testing, and hardware/software integration.",
    },
    {
        name: "UMSATS",
        period: "2025 - Present",
        contribution:
            "Software and Command Data Handling work for satellite subsystems and mission simulations.",
    },
];

export const awards = [
    "Undergraduate Research Award",
    "Cybersecurity Bootcamp Project Winner",
    "Game Jam People's Choice Award",
    "Academic Scholarship for Academic Excellence",
];

export const navItems = [
    {
        id: "work",
        label: "Work",
        command: "work",
        number: "01",
        doorCopy: "Systems I have built",
        accent: "vermilion",
    },
    {
        id: "journey",
        label: "Journey",
        command: "journey",
        number: "02",
        doorCopy: "How the layers formed",
        accent: "indigo",
    },
    {
        id: "about",
        label: "Manual",
        command: "about",
        number: "03",
        doorCopy: "How I operate",
        accent: "peacock",
    },
    {
        id: "contact",
        label: "Connect",
        command: "contact",
        number: "04",
        doorCopy: "Start a conversation",
        accent: "marigold",
    },
] as const;
