// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination(req, file, cb){
        const imgPath = path.join(__dirname, '../../public/images/products')
        cb(null, imgPath )
    },
    filename(req, file, cb){
        const extension = path.extname(file.originalname)
        const now = Date.now()
        const fileName = now + extension
        cb(null, fileName)
    } 
    
})
const upload = multer ({storage})



// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/',upload.single('image'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('image'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
