const path = require('path');
const fs = require('fs');


const { v4: uuidv4 } = require('uuid');
const admzip = require('adm-zip');

const imageHelpers = require('../util/helpers');

const rootdir = imageHelpers.getPath();

exports.resizeImagesInFolder = async (heigth, width, imagePathArray, outFolderPath, ) => {
    if (typeof heigth !== 'number' || typeof width !== 'number') {
        return  new Error('Height and Width must be integers');
    }
    const imagePaths = [];
    let newImagePath;
    try {
        for (let file of imagePathArray) {
            const extension = file.originalname.split('.')[1];
            const imagePath = path.join(rootdir, file.path.replaceAll('\\', '/'));
            console.log('Old Image path:', imagePath);
            newImagePath = path.join(outFolderPath, uuidv4() + 'resized.' + extension);
            console.log('New Image path:', newImagePath);
            imagePaths.push(newImagePath.replaceAll('\\', '/'));
            await imageHelpers.resizeImage(heigth, width, imagePath, newImagePath);
        }
        return {
            success: true,
            imagePaths: imagePaths,
            imageFolder: outFolderPath.replaceAll('\\', '/'),
        };
    } catch (err) {
        const error = new Error(err);
        return error;
    }
}

exports.compressImagesInFolder = async (quality, imagePathArray, outFolderPath) => {
    if (typeof quality !== 'number') {
        throw new Error('Quality must be an integer');
    };
    if (typeof outFolderPath !== 'string') {
        throw new Error('outFolderPath must be a string');
    };
    try {
        const imagePaths = [];
        let newImagePath;
        for (let file of imagePathArray) { 
            const extension = file.originalname.split('.')[1];
            const imagePath = path.join(rootdir, file.path.replaceAll('\\', '/'));
            console.log('Old Image path:', imagePath);
            newImagePath = path.join(outFolderPath, uuidv4() + 'compressed.' + extension);
            console.log('New Image path:', newImagePath);
            imagePaths.push(newImagePath.replaceAll('\\', '/'));
            await imageHelpers.compressImage(quality, extension, imagePath, newImagePath)
        }        
        return {
            success: true,
            imagePaths: imagePaths,
            imageFolder: outFolderPath.replaceAll('\\', '/'),
        };
    } catch (err) {
        const error = new Error(err);
        return error;
    }
}

exports.zipFolder = async (imagePaths, imageFolder) => {
    try {
        const zip = new admzip();
        const outputFilePath = path.join(__dirname, '..', 'images', 'folder' + uuidv4().split('-')[0] + '.zip');
        if (imagePaths) {
            imagePaths.forEach((file) => {
                zip.addLocalFile(file);               
            });

            zip.writeZip(outputFilePath);
            console.log('Zipping..');

            const zipFile = outputFilePath.replaceAll('\\', '/');
            console.log('Zip File:', zipFile);
            imageHelpers.deleteImages(imagePaths, imageFolder);
            return { success: true, folder: zipFile , Url: zipFile.substr(5, 25) };
            // Url: zipFile.substr(48, 25) in development 
            
        }
    } catch (err) {
        const error = new Error(err);
        imageHelpers.deleteImages(imagePaths, imageFolder);
        return error;
    }

}



