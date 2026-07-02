export default function robots() {
  // Use environment variable or default to production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitea.at';
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      // If we are not in production, block all crawling
      allow: isProduction ? '/' : '',
      disallow: isProduction ? '' : '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
