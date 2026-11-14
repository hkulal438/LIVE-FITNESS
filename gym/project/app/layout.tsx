import './globals.css';
import type { Metadata } from 'next';
import { Inter, Anton, Bebas_Neue } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Live Fitness Gym | Premium Gym in Koramangala 8th Block, Bengaluru',
  description:
    'Live Fitness Gym in Koramangala 8th Block, Adugodi, Bengaluru. Strength training, muscle building, personal training, and weight management. Open Mon–Sat 5 AM – 11 PM.',
  keywords: [
    'Live Fitness Gym',
    'Gym in Koramangala 8th Block',
    'Gym in Adugodi',
    'Gym on Sri Rama Temple Road',
    'Gym in Bengaluru',
    'fitness Bengaluru',
    'strength training Bengaluru',
    'personal trainer Bengaluru',
  ],
  openGraph: {
    title: 'Live Fitness Gym | Premium Gym in Koramangala, Bengaluru',
    description:
      'Show up. Get stronger. Keep going. Strength training, personal training, and fitness in Koramangala 8th Block, Bengaluru.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Fitness Gym | Koramangala 8th Block, Bengaluru',
    description:
      'Show up. Get stronger. Keep going. Premium fitness in Koramangala, Bengaluru.',
  },
  metadataBase: new URL('https://livefitnessgym.in'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${bebas.variable}`}
    >
      <body className="font-body antialiased bg-white text-ink">
        {children}
      </body>
    </html>
  );
}
