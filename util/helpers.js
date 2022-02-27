const path = require('path');
const fs = require('fs');


const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');
const admzip = require('adm-zip');


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

exports.resizeImage = async (heigth, width, imagePath, newImagePath) => {
    try {
        await sharp(imagePath)
            .resize({
                width: width,
                height: heigth
            })
            .toFile(newImagePath)
        return newImagePath;
    } catch (err) {
        const error = new Error(err);
        throw error;
    }
}

exports.compressImage = async (quality, extension, imagePath, newImagePath) => {
    try {
        if (extension === 'png') {
            await sharp(imagePath)
                .toFormat("png", { compressionLevel: 9, quality: quality / 10 })
                .toFile(newImagePath);
            return newImagePath
        }
        await sharp(imagePath)
            .toFormat("jpeg", { mozjpeg: true, quality: quality })
            .toFile(newImagePath);
        return newImagePath;
    } catch (err) {
        const error = new Error(err);
        throw error;
    }
};

exports.deleteImages = (imagepath, imageFolder) => {
    try {
        if (imagepath.length !== 0) {
            imagepath.forEach((file) => {
                fs.unlinkSync(file)
            });
        }

        if (imageFolder) {
            fs.rmdir(imageFolder, err => {
                if (err) console.log(err);
            })
        }
        return 'done';
    } catch (err) {
        const error = new Error(err);
        return error;
    }

}
