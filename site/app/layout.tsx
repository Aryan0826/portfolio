import type { Metadata } from 'next';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://aryan-aangan-os.aryanveks.chatgpt.site';
const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const ogImageUrl = new URL(`${publicBasePath}/og.png`, new URL(siteUrl).origin);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Aryan Vekariya — AV-DOS',
  description: 'The personal operating system of Aryan Vekariya, a Computer Science student building across software, systems, and robotics.',
  applicationName: 'AV-DOS',
  authors: [{ name: 'Aryan Vekariya' }],
  openGraph: {
    type: 'website',
    title: 'Aryan Vekariya — AV-DOS',
    description: 'Code, curiosity, and character. Follow Aryan Vekariya’s journey across software, systems, and robotics.',
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'Aryan Vekariya — Code, Curiosity, Character' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Vekariya — AV-DOS',
    description: 'Code, curiosity, and character. Follow Aryan Vekariya’s projects, systems work, and robotics.',
    images: [ogImageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
