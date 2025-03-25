import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sizes = {
  'favicon.png': 32,
  'apple-touch-icon.png': 180,
  'og-image.png': 1200
};

async function generateIcons() {
  const inputSvg = await fs.readFile('public/icon-large.svg');
  
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(inputSvg)
      .resize(size, size)
      .png()
      .toFile(`public/${filename}`);
    
    console.log(`Generated ${filename} (${size}x${size}px)`);
  }
}

generateIcons().catch(console.error); 