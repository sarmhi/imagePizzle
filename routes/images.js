const express = require('express');

const imageControllers = require('../controllers/images');

const router = express.Router();

router.get('', imageControllers.getImage);

router.post('/resize-android', imageControllers.resizeImagesAndroid);

router.post('/compress', imageControllers.compressImages);

router.post('/resize-ios', imageControllers.resizeImagesIos);


module.exports = router;