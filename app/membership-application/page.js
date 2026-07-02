import fs from 'fs';
import path from 'path';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import '../../membership-application.css';

export const metadata = {
  title: 'AITEA Membership Application',
  description: 'Apply for AITEA membership through a guided application form for individuals, corporates, and institutions.',
};

export default function MembershipApplicationPage() {
  const rootDir = process.cwd();
  const filePath = path.join(rootDir, 'membership-application.html');
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Extract Body contents
  const bodyMatch = fileContent.match(/<body[^>]*>([^]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : fileContent;

  // Clean out duplicate stylesheet links and script tags
  bodyContent = bodyContent.replace(/<link[^>]*href=".*src\/styles\/main\.css"[^>]*>/gi, '');
  bodyContent = bodyContent.replace(/<link[^>]*href=".*membership-application\.css"[^>]*>/gi, '');
  bodyContent = bodyContent.replace(/<script[^>]*src=".*src\/main\.js"[^>]*><\/script>/gi, '');
  bodyContent = bodyContent.replace(/<script[^>]*src=".*membership-application\.js"[^>]*><\/script>/gi, '');

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
      <Script src="/membership-application.js" strategy="afterInteractive" />
    </>
  );
}
