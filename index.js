const express = require('express');
const app = express();
const path = require('path');
const upload = require('./_helpers/img-destination');
const getImagesFromDir = require('./_helpers/getImagesFromDir');

app.set('view engine', 'ejs');    // Set the view engine (EJS)
  
app.use(express.static('./public'));    // Public Folder
  
app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', { msg: err });
        } else {
            if(req.file == undefined){
                    res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('index', {
                    msg: 'File uploaded successfully!',
                    file: `uploads/${req.file.filename}`
                });
            } 
        }
    });
});

app.get('/photo-gallery', (req, res) => {
    let images = getImagesFromDir(path.join(__dirname, 'public/uploads'));
    res.render('photo-gallery', { title: 'Multer File Uploads to Auto Generate a Photo Gallery from a Directory in NodeJs', images: images })
});

const port = 7000;
  
app.listen(port, () => console.log(`Application started on port ${port}`)); 