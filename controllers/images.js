const path = require('path');
const { v4: uuidv4 } = require('uuid');


const imageServices = require('../service/image');
const imageHelpers = require('../util/helpers');

exports.getImage = (req, res, next) => {
    res.status(200).render('images/index', {
        pageTitle: 'ImagePizzle'
    })
};

exports.postImage = async (req, res, next) => {
    if (!req.files) {
        return res.status(200).render('images/index', {
            pageTitle: 'ImagePizzle'
        })
    }
    const imageDestinationFolder = imageHelpers.createFolder();
    console.log('imageDestinationFolder:',imageDestinationFolder);
    const result = await imageServices.resizeImagesInFolder(200, 200, req.files, imageDestinationFolder);
    // const newResult = await imageServices.compressImagesInFolder(20, req.files, imageDestinationFolder);
    const zippedFile = await imageServices.zipFolder(imageDestinationFolder);
    console.log(result);

    res.send('Done')


}