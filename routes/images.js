const express = require('express');

const imageControllers = require('../controllers/images');

const router = express.Router();

router.get('', imageControllers.getImage);

router.post('/resize-android', imageControllers.resizeImagesAndroid);

router.post('/compress', imageControllers.compressImages);

router.post('/resize-ios', imageControllers.resizeImagesIos);

router.post('/download-image', imageControllers.downloadZip);


module.exports = router;