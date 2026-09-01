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
  metadataBase: new URL('https://origround.github.io'),
  title: 'OriGround: Orientation-Aware Neuro-Symbolic Zero-Shot 3D Visual Grounding',
  description:
    'OriGround explicitly models object-centric orientations and inferred viewpoints for zero-shot 3D visual grounding.',
  authors: [
    { name: 'Haochen Li' },
    { name: 'Jiaxin Shi' },
    { name: 'Ruonan Liu' },
    { name: 'Luo Liufu' },
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'OriGround: Orientation-Aware Neuro-Symbolic Zero-Shot 3D Visual Grounding',
    description:
      'Viewpoint-aware parsing, object-centric orientation estimation, symbolic execution, and aligned visual prompting.',
    images: ['/paper-figures/pipeline-complete.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OriGround: Orientation-Aware 3D Visual Grounding',
    description: 'Explicit reference frames for zero-shot 3D visual grounding.',
    images: ['/paper-figures/pipeline-complete.png'],
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
