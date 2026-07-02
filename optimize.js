import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'public/images/sports_exchange.png';
const outputPath = 'public/images/sports_exchange.webp';

async function optimize() {
  try {
    const metadata = await sharp(inputPath).metadata();

    // Decrease max width to 800px to ensure it goes below 100KB
    const width = Math.min(metadata.width, 800);

    await sharp(inputPath)
      .resize({ width: width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outputPath);

    console.log(`Optimized image saved to ${outputPath}`);

    const stats = fs.statSync(outputPath);
    console.log(`New size: ${(stats.size / 1024).toFixed(2)} KB`);
  } catch (err) {
    console.error('Error optimizing image:', err);
  }
}

optimize();
