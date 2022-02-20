const Image = require('../util/image');

exports.getImage = (req, res, next) => {
    res.status(200).render('images/index', {
        pageTitle: 'ImagePizzle'
    })
};

exports.postImage = async (req, res, next) => {
    if(!req.file){
        return res.status(200).render('images/index', {
            pageTitle: 'ImagePizzle'
        })
    }
    console.log(req.file);
    const imageName = req.file.originalname;
    const imagePath = req.file.path.replace('\\', '/');
    const image = new Image(imageName, imagePath );
    const result = await image.resizeImage(400, 400);
    console.log(result);
    res.send('Done')

    
}