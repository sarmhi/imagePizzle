const path = require('path');
const fs = require('fs')
const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');


exports.getPath = (imagePath = 'undefined') => {
    if (imagePath === 'undefined') {
        return path.join(__dirname, '..');
    }
    const returnedPath = path.join(__dirname, '..', imagePath);
    return returnedPath;
};


exports.createFolder = () => {
    const folderName = path.join(__dirname, '..', 'images', 'folder' + uuidv4().split('-')[0]);
    try {
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName)
        }
        return folderName;
    } catch (err) {
        console.error(err)
    }
};

exports.createZipFolder = () => {
    const outputFilePath = path.join(__dirname, '..', 'images', 'folder' + uuidv4().split('-')[0] + '.zip')
    return outputFilePath;
};

exports.resizeImage= async (heigth, width, imagePath, newImagePath)=>{
    await sharp(imagePath)
                .resize({
                    width: width,
                    height: heigth
                })
                .toFile(newImagePath);
    return newImagePath
}

exports.compressImage = async (quality, extension, imagePath, newImagePath) => {
    if (extension === 'png') {
        await sharp(imagePath)
            .toFormat("png", { compressionLevel: 9, quality: quality })
            .toFile(newImagePath);
        return newImagePath
    }
    await sharp(imagePath)
        .toFormat("jpeg", { mozjpeg: true, quality: quality })
        .toFile(newImagePath);
    return newImagePath;
}
