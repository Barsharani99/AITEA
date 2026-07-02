import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Auto-copy generated files during setup
const artifactImage = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\dde56571-b621-4ea1-99a1-e24417da27f5\\sports_exchange_1782291788829.png';
const destDir = resolve(__dirname, 'public/images');
const destFile = resolve(destDir, 'sports_exchange.webp');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  if (fs.existsSync(artifactImage)) {
    fs.copyFileSync(artifactImage, destFile);
    console.log('AITEA Next.js: Sports image copied successfully to public/images/sports_exchange.webp');
  }

  // Copy membership-application.js to public folder for static script serving
  const formScriptSrc = resolve(__dirname, 'membership-application.js');
  const formScriptDest = resolve(__dirname, 'public/membership-application.js');
  if (fs.existsSync(formScriptSrc)) {
    fs.copyFileSync(formScriptSrc, formScriptDest);
    console.log('AITEA Next.js: membership-application.js copied successfully to public/');
  }
} catch (e) {
  console.error('AITEA Next.js: Failed to copy static assets:', e);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure redirects for HTML pages to their clean URLs
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:path*.html',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
