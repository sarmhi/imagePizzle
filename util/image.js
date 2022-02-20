const path = require('path');
const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');

const getPath = (imagePath='undefined') =>{
    if (imagePath === 'undefined'){
        return path.join(__dirname, '..');
    }
    const returnedPath = path.join(__dirname, '..', imagePath);
    return returnedPath;
}


class Image {
    constructor(imageName, imagePath) {
        this.imageName = imageName;
        this.imagePath = getPath(imagePath);
    }

    async resizeImage(heigth, width) {
        const extension = this.imageName.split('.')[1];
        let newPath = getPath('images/' +uuidv4() + '.' + extension);
        try {
            await sharp(this.imagePath)
                .resize({
                    width: width,
                    height: heigth
                })
                .toFile(newPath);
            return {success: true, newPath: newPath};
        } catch (error) {
            console.log(error);
            return {success: false};
        }
    }
}

module.exports = Image;