const express = require('express');

const imageControllers = require('../controllers/images');

const router = express.Router();

router.get('/get-image', imageControllers.getImage);

router.post('/post-image', imageControllers.postImage);

module.exports = router;