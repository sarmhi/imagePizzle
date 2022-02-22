const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const admzip = require('adm-zip');

const imageHelpers = require('../util/helpers');

const rootdir = imageHelpers.getPath();



exports.resizeImagesInFolder = async (heigth, width, imagePathArray, outFolderPath) => {
    if (typeof heigth !== 'number' || typeof width !== 'number') {
        throw new Error('Height and Width must be integers');
    }
    const imagePaths = [];
    let newImagePath;
    try {
        imagePathArray.forEach(async (file) => {
            const extension = file.originalname.split('.')[1];
            const imagePath = path.join(rootdir, file.path.replaceAll('\\', '/'));
            newImagePath = path.join(outFolderPath, uuidv4() + 'resized.' + extension);
            imagePaths.push(newImagePath.replaceAll('\\', '/'));
            const result = await imageHelpers.resizeImage(heigth, width, imagePath, newImagePath);
        });
        return {
            success: true,
            imagePaths: imagePaths,
            imageFolder: outFolderPath.replaceAll('\\', '/'),
        };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}

exports.compressImagesInFolder = async (quality, imagePathArray, outFolderPath) => {
    if (typeof quality !== 'number') {
        throw new Error('Quality must be an integer');
    };
    if (typeof outFolderPath !== 'string') {
        throw new Error('outFilePath must be a string');
    };
    try {
        const imagePaths = [];
        let newImagePath;
        imagePathArray.forEach(async (file) => {
            const extension = file.originalname.split('.')[1];
            const imagePath = path.join(rootdir, file.path.replaceAll('\\', '/'));
            newImagePath = path.join(outFolderPath, uuidv4() + 'compressed.' + extension);
            imagePaths.push(newImagePath.replaceAll('\\', '/'));
            imageHelpers.compressImage(quality, extension, imagePath, newImagePath)
        });
        return {
            success: true,
            imagePaths: imagePaths,
            imageFolder: outFolderPath.replaceAll('\\', '/'),
        };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}

exports.zipFolder = async (folderPath) => {
    try {
        const zip = new admzip();
        const outputFilePath = path.join(__dirname, '..', 'images', 'folder' + uuidv4().split('-')[0] + '.zip');
        console.log('OutputFilePath', outputFilePath);
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
    } catch (err) {
        console.log(err)
        return { success: false }
    }

}
