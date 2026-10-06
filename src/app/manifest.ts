import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yeggoni Madhuri | Portfolio",
    short_name: 'Madhuri Portfolio',
    description: 'Portfolio of Yeggoni Madhuri — B.Tech CSE Student specializing in Cloud Computing, DevOps, and Web Development.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e1e1e',
    theme_color: '#007acc',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
