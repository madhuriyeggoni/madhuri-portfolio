import type { Metadata, Viewport } from 'next';
import { Fira_Code, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const firaCode = Fira_Code({
  variable: '--font-mono',
  subsets: ['latin'],
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Yeggoni Madhuri | Portfolio",
  description: 'Portfolio of Yeggoni Madhuri — B.Tech CSE Student specializing in Cloud Computing, DevOps, and Web Development.',
  keywords: [
    'Yeggoni Madhuri',
    'Cloud Computing',
    'DevOps',
    'AWS',
    'Web Development',
    'Quantum ML',
    'Portfolio',
    'VS Code Portfolio'
  ],
  authors: [{ name: 'Yeggoni Madhuri' }],
  creator: 'Yeggoni Madhuri',
  publisher: 'Yeggoni Madhuri',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: "Yeggoni Madhuri | Portfolio",
    description: 'Portfolio of Yeggoni Madhuri — B.Tech CSE Student specializing in Cloud Computing, DevOps, and Web Development.',
    siteName: "Yeggoni Madhuri | Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Yeggoni Madhuri | Portfolio",
    description: 'Portfolio of Yeggoni Madhuri — B.Tech CSE Student specializing in Cloud Computing, DevOps, and Web Development.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1e1e1e',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Yeggoni Madhuri',
      jobTitle: 'B.Tech CSE Student | Cloud & DevOps Enthusiast',
      almaMater: 'Siddhartha Institute of Science and Technology',
      sameAs: [
        'https://github.com/madhuriyeggoni',
        'https://www.linkedin.com/in/madhuri-yeggoni/',
      ]
    },
    {
      '@type': 'WebSite',
      name: "Yeggoni Madhuri | Portfolio",
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${firaCode.variable} ${jetBrainsMono.variable} antialiased font-mono overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
