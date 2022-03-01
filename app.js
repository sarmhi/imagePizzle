const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const imageRoutes = require('./routes/images');
const errorControllers = require('./controllers/error');
const jobControllers = require('./controllers/cron');

const maxSize = 20 * 1024 * 1024;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4()[0] + file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter, limits:{fileSize:maxSize}}).array("file", 30));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(imageRoutes);
app.use(jobControllers.startJob);

app.get('/500', errorControllers.get500);
app.use(errorControllers.get404);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('500', {
        pageTitle: 'Error!'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
});