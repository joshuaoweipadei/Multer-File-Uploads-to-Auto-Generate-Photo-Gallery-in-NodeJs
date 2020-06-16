const path = require('path');
const fs = require('fs');

function getImagesFromDir(dirPath) {
    let allImages = [];    // All iamges holder, defalut value is empty
    let files = fs.readdirSync(dirPath);    // Iterator over the directory
    // Iterator over the files and push jpg and png images to allImages array.
    for (file of files) {
        let fileLocation = path.join(dirPath, file);
        var stat = fs.statSync(fileLocation);
        if (stat && stat.isDirectory()) {
            getImagesFromDir(fileLocation); // process sub directories
        } else if (stat && stat.isFile() && ['.jpg', '.png', '.jpeg', 'gif'].indexOf(path.extname(fileLocation)) != -1) {
            allImages.push('uploads/'+file); // push all .jpf, .png, .jpeg and gif files to all images 
        }
    }
    // return all images in array formate
    return allImages;
}

module.exports = getImagesFromDir;