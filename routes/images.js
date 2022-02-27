const express = require('express');

const imageControllers = require('../controllers/images');

const router = express.Router();

router.get('', imageControllers.getImage);

router.post('/resize', imageControllers.resizeImages);

router.post('/compress', imageControllers.compressImages);


module.exports = router;