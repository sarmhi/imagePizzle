const path = require('path');

exports.getPath = (imagePath='undefined') =>{
    if (imagePath === 'undefined'){
        return path.join(__dirname, '..');
    }
    const returnedPath = path.join(__dirname, '..', imagePath);
    return returnedPath;
};