const path = require('path');
const fs = require('fs');


const imageServices = require('../service/image');
const imageHelpers = require('../util/helpers');

const compressionLevels = {
    high: 10,
    medium: 50,
    low: 90
}

const resizeValues = {
    LDPI: 36,
    MDPI: 48,
    HDPI: 72,
    XHDPI: 96,
    XXHDPI: 144,
    XXXHDPI: 192,
    oneX: 100,
    twoX: 200,
    threeX: 300
}

exports.getImage = (req, res, next) => {
    res.status(200).render('images/index', {
        pageTitle: 'ImagePizzle'
    })
};

exports.resizeImagesAndroid = async (req, res, next) => {
    if (req.files.length === 0) {
        return res.status(200).render('images/index', {
            pageTitle: 'ImagePizzle'
        })
    };
    console.log('Starting')
    try {
        const keys = Object.keys(req.body);
        if(keys.length === 0){
            keys.push('LDPI');
        }
        const imageDestinationFolder = imageHelpers.createFolder();
        const zipArray = [];
        let resizedImages;
        let resizeValue;
        for (let key of keys) {
            resizeValue = resizeValues[key];
            resizedImages = await imageServices.resizeImagesInFolder(resizeValue, resizeValue, req.files, imageDestinationFolder);
            zipArray.push(...resizedImages.imagePaths);
        }
        console.log('Resizing')


        const zippedFolder = await imageServices.zipFolder(zipArray, resizedImages.imageFolder);
        console.log('Done')
        res.render('images/download', {
            pageTitle: 'ImagePizzle',
            domain: req.header('host'),
            url: zippedFolder.Url
        });
        req.files.forEach((file) => {
            fs.unlinkSync(file.path)
        });
    } catch (err) {
        const error = new Error(err);
        req.files.forEach((file) => {
            fs.unlinkSync(file.path)
        });
        return next(error);
    }
};

exports.compressImages = async (req, res, next) => {
    if (req.files.length === 0) {
        return res.status(200).render('images/index', {
            pageTitle: 'ImagePizzle'
        })
    };

    try {
        const keys = Object.values(req.body);
        if(keys.length === 0){
            keys.push('medium');
        }
        const imageDestinationFolder = imageHelpers.createFolder();
        const zipArray = [];
        let compressedImages;
        let compressionLevel;
        for (let key of keys) {
            compressionLevel = compressionLevels[key];
            compressedImages = await imageServices.compressImagesInFolder(compressionLevel, req.files, imageDestinationFolder);
            zipArray.push(...compressedImages.imagePaths);
        }


        const zippedFolder = await imageServices.zipFolder(zipArray, compressedImages.imageFolder);
        res.render('images/download', {
            pageTitle: 'ImagePizzle',
            domain: req.header('host'),
            url: zippedFolder.Url
        });
        req.files.forEach((file) => {
            fs.unlinkSync(file.path)
        });
    } catch (err) {
        const error = new Error(err);
        req.files.forEach((file) => {
            fs.unlinkSync(file.path)
        });
        return next(error);
    }

};


exports.resizeImagesIos = async (req, res, next) => {
    if (req.files.length === 0) {
        return res.status(200).render('images/index', {
            pageTitle: 'ImagePizzle'
        })
    };

    try {
        const keys = Object.keys(req.body);
        if(keys.length === 0){
            keys.push('oneX');
        }
        const imageDestinationFolder = imageHelpers.createFolder();
        const zipArray = [];
        let resizedImages;
        let resizeValue;
        for (let key of keys) {
            resizeValue = resizeValues[key];
            resizedImages = await imageServices.resizeImagesInFolder(resizeValue, resizeValue, req.files, imageDestinationFolder);
            zipArray.push(...resizedImages.imagePaths);
        }


        const zippedFolder = await imageServices.zipFolder(zipArray, resizedImages.imageFolder);
        res.render('images/download', {
            pageTitle: 'ImagePizzle',
            domain: req.header('host'),
            url: zippedFolder.Url
        });
        req.files.forEach((file) => {
            fs.unlinkSync(file.path)
        });
    } catch (err) {
        const error = new Error(err);
        req.files.forEach((file) => {
            fs.unlinkSync(file.path)
        });
        return next(error);
    }
};