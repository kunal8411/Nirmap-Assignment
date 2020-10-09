

const express= require('express');

const router= express.Router();

const productController=require('../controller/products_controller')

router.get('/addproducts', productController.addproducts)


router.post('/viewproducts' ,productController.addProductsIntoStore)
module.exports=router;