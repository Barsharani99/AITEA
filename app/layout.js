import '../src/styles/variables.css';
import '../src/styles/main.css';
import ClientInit from './ClientInit';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: 'AITEA - Austria India Trade & Education Association',
  description: 'Connecting Austria and India through bilateral trade partnerships, academic cooperation, tech innovation, culture, gastronomy, tourism, and sports exchange.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <ClientInit />
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
