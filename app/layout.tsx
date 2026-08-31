import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OriGround — Orientation-Aware Zero-Shot 3D Visual Grounding',
  description:
    'OriGround makes reference frames explicit for orientation-aware neuro-symbolic zero-shot 3D visual grounding.',
  openGraph: {
    title: 'OriGround — Ground language in 3D from the right point of view',
    description:
      'Orientation-aware neuro-symbolic reasoning and perspective-aligned visual prompting for zero-shot 3D grounding.',
    images: ['/visuals/orientation-full.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OriGround — Orientation-Aware 3D Visual Grounding',
    description: 'Make the reference frame explicit.',
    images: ['/visuals/orientation-full.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
