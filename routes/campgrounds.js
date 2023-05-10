const express = require('express');
const router = express.Router();
const campgrounds = require('../controller/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const Campground = require('../models/campground');


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground))
    //single file
    // .post(upload.single('image'),(req,res) =>{
    //     console.log(req.body, req.file);
    //     res.send('IT WORKED')
    // })
    //many files
    // .post(upload.array('image'),(req,res) =>{
    //     console.log(req.body, req.files);
    //     res.send('IT WORKED')
    // })
router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))
 

router.get('/new',isLoggedIn, campgrounds.renderNewForm)
router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm ))
module.exports = router;