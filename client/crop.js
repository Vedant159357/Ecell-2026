import sharp from 'sharp';
import fs from 'fs';

const filePath = "C:\\Users\\Atharva\\Desktop\\Ecell-2026\\Ecell-2026\\client\\public\\Econclave-2026\\WhatsApp Image 2026-03-16 at 9.41.17 PM.jpeg";
const tempPath = "C:\\Users\\Atharva\\Desktop\\Ecell-2026\\Ecell-2026\\client\\public\\Econclave-2026\\cropped-temp.jpeg";

async function run() {
  const metadata = await sharp(filePath).metadata();
  
  // Crop a substantial portion of top and bottom padding from a typical screenshot
  // e.g., keep 50% of the middle height
  const heightToKeep = Math.floor(metadata.height * 0.45);
  const topToSkip = Math.floor((metadata.height - heightToKeep) / 2);

  await sharp(filePath)
    .extract({
      left: 0,
      top: topToSkip,
      width: metadata.width,
      height: heightToKeep
    })
    .toFile(tempPath);

  // Replace original file with cropped
  fs.unlinkSync(filePath);
  fs.renameSync(tempPath, filePath);
  
  console.log("Successfully cropped WhatsApp screenshot");
}

run().catch(console.error);
