import sharp from 'sharp';
import fs from 'fs';

const filePath = "C:\\Users\\Atharva\\Desktop\\Ecell-2026\\Ecell-2026\\client\\public\\Econclave-2026\\WhatsApp Image 2026-03-16 at 9.41.26 PM.jpeg";
const tempPath = "C:\\Users\\Atharva\\Desktop\\Ecell-2026\\Ecell-2026\\client\\public\\Econclave-2026\\cropped-temp2.jpeg";

async function run() {
  const metadata = await sharp(filePath).metadata();
  
  // Crop 25% off every side to effectively 'zoom in' to the center logo
  const cropX = Math.floor(metadata.width * 0.25);
  const cropY = Math.floor(metadata.height * 0.25);
  const newWidth = metadata.width - (cropX * 2);
  const newHeight = metadata.height - (cropY * 2);

  await sharp(filePath)
    .extract({
      left: cropX,
      top: cropY,
      width: newWidth,
      height: newHeight
    })
    .toFile(tempPath);

  // Replace original file with cropped
  fs.unlinkSync(filePath);
  fs.renameSync(tempPath, filePath);
  
  console.log("Successfully zoomed/cropped the image");
}

run().catch(console.error);
