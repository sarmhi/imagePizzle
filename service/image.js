const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');

const imageHelpers = require('../util/helpers');


class Image {
    constructor(imageName, imagePath) {
        this.imageName = imageName;
        this.imagePath = imageHelpers.getPath(imagePath);
        this.extension = imageName.split('.')[1]
    }

    async resizeImage(heigth, width) {
        if (typeof heigth !== 'number' || typeof width !== 'number') {
            throw new Error('Height and Width must be integers');
        }

        let newImagePath = imageHelpers.getPath('images/' + uuidv4() + '.' + this.extension);
        try {
            await sharp(this.imagePath)
                .resize({
                    width: width,
                    height: heigth
                })
                .toFile(newImagePath);
            return { success: true, newPath: newPath };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    async compressImage(quality) {
        if (typeof quality !== 'number') {
            throw new Error('Quality must be an integer');
        }
        let newImagePath = imageHelpers.getPath('images/' + uuidv4() + '.' + this.extension);
        try {
            if (this.extension === 'png') {
                await sharp(this.imagePath)
                    .toFormat("png", { compressionLevel: 9, quality: quality })
                    .toFile(newImagePath);
                return { success: true, newPath: newImagePath.replaceAll('\\', '/') };
            }
            await sharp(this.imagePath)
                .toFormat("jpeg", { mozjpeg: true, quality: quality })
                .toFile(newImagePath);
            return { success: true, newPath: newImagePath.replaceAll('\\', '/') };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
}

module.exports = Image;