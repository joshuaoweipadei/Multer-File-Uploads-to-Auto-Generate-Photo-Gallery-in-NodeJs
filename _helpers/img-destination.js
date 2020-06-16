const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
  // Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');
  
// Check File Type
function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;   // Allowed ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());   // Check ext
    const mimetype = filetypes.test(file.mimetype);   // Check mime
    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Only .png, .jpg, .gif and .jpeg format allowed!');
    }
}

module.exports = upload;