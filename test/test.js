const sharp = require("sharp");
const fs = require('fs');
const path = require('path');
const admzip = require('adm-zip');
const { v4: uuidv4 } = require('uuid');

async function resizeImage() {
  try {
    await sharp("sammy-transparent.png")
      .toFormat("png", { compressionLevel: 9, quality: 10 })
      .toFile("sammy-transparent-compressed.png");
  } catch (error) {
    console.log(error);
  }
}

const folderPath = path.join(__dirname, '..', '..', '..', '..', 'Pictures', 'Camera Roll');
const files = fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName).replaceAll('\\', '/');
})
console.log(files);

const zipFolder = (folderPath) => {
  const zip = new admzip();
  const outputFilePath = path.join(__dirname, '..', '..', '..', '..', 'Pictures', 'Camera Roll', 'folder' + uuidv4().split('-')[0] + '.zip')
  if (folderPath) {
    const files = fs.readdirSync(folderPath).map(fileName => {
      return path.join(folderPath, fileName).replaceAll('\\', '/');
    })
    files.forEach((file) => {
      console.log(file)
      zip.addLocalFile(file);
    });
    fs.writeFile(outputFilePath, zip.toBuffer(), (err, data) => {
      return { success: true, folder: outputFilePath.replaceAll('\\', '/') };
    });
  }
}
console.log(zipFolder(path.join(__dirname, '..', 'images', 'foldereb7d4f15')));
