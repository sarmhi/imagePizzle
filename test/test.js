const sharp = require("sharp");

async function resizeImage() {
  try {
    await sharp("sammy-transparent.png")
      .toFormat("png", { compressionLevel: 9, quality: 10 })
      .toFile("sammy-transparent-compressed.png");
  } catch (error) {
    console.log(error);
  }
}

resizeImage();