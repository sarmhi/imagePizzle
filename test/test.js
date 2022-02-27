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
// const files = fs.readdirSync(folderPath).map(fileName => {
//   return path.join(folderPath, fileName).replaceAll('\\', '/');
// })
// console.log(files);

const zipFolder = (folderPath) => {
  const zip = new admzip();
  const outputFilePath = path.join(__dirname, '..', '..', '..', '..', 'Pictures', 'Camera Roll', 'folder' + uuidv4().split('-')[0] + '.zip')
  if (folderPath) {
    fs.readdir(folderPath, (err, files)=>{
      if(err) {
        return console.log('Error:',err)
      }
      const newFiles = files.map(fileName => {
        return path.join(folderPath, fileName).replaceAll('\\', '/');
      });

      newFiles.forEach((file) => {
        console.log('File#:',file)
        zip.addLocalFile(file);
      });
      zip.writeZip(outputFilePath);
    })
    
  }
}
console.log(zipFolder(folderPath));
