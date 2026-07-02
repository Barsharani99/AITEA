import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

function getHtmlPageData(slugParts) {
  const slug = (slugParts || []).join('/');
  const pageName = slug === '' ? 'index' : slug;
  
  // We handle membership-application and event-registration in dedicated custom pages
  if (pageName === 'membership-application' || pageName === 'event-registration') {
    return null;
  }

  const rootDir = process.cwd();
  const filePath = path.join(rootDir, `${pageName}.html`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Extract Title
  const titleMatch = fileContent.match(/<title>([^]*?)<\/title>/);
  const title = titleMatch ? titleMatch[1].trim() : 'AITEA';
  
  // Extract Meta Description
  const descMatch = fileContent.match(/<meta\s+name="description"\s+content="([^]*?)"/i) || 
                    fileContent.match(/<meta\s+content="([^]*?)"\s+name="description"/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Extract all page-specific style tags
  const styleMatches = [...fileContent.matchAll(/<style[^>]*>([^]*?)<\/style>/gi)];
  const styles = styleMatches.map(m => m[0]).join('\n');

  // Extract Body contents
  const bodyMatch = fileContent.match(/<body[^>]*>([^]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : fileContent;

  // Clean out duplicate stylesheet links and main.js script elements to prevent load duplication
  bodyContent = bodyContent.replace(/<link[^>]*href="\/src\/styles\/main\.css"[^>]*>/gi, '');
  bodyContent = bodyContent.replace(/<link[^>]*href="\.\/src\/styles\/main\.css"[^>]*>/gi, '');
  bodyContent = bodyContent.replace(/<script[^>]*src="\/src\/main\.js"[^>]*><\/script>/gi, '');
  bodyContent = bodyContent.replace(/<script[^>]*src="\.\/src\/main\.js"[^>]*><\/script>/gi, '');

  return {
    title,
    description,
    bodyContent,
    styles
  };
}

export async function generateMetadata({ params }) {
  const pageData = getHtmlPageData(params.slug);
  if (!pageData) {
    return {};
  }
  return {
    title: pageData.title,
    description: pageData.description,
  };
}

export async function generateStaticParams() {
  const rootDir = process.cwd();
  const filenames = fs.readdirSync(rootDir);
  const htmlFiles = filenames.filter(
    f => f.endsWith('.html') && f !== 'membership-application.html'
  );

  return htmlFiles.map(filename => {
    const slugName = filename.replace('.html', '');
    return {
      slug: slugName === 'index' ? [] : [slugName],
    };
  });
}

export default function CatchAllPage({ params }) {
  const pageData = getHtmlPageData(params.slug);
  if (!pageData) {
    notFound();
  }

  return (
    <>
      {pageData.styles && <div dangerouslySetInnerHTML={{ __html: pageData.styles }} />}
      <div dangerouslySetInnerHTML={{ __html: pageData.bodyContent }} />
    </>
  );
}
