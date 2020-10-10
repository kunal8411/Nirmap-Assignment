

const express= require('express');

const router= express.Router();

const productController=require('../controller/products_controller')

router.get('/addproducts/:id', productController.getAddProductsPage)


router.post('/addproducts/:id' ,productController.addProductsIntoStore)

router.get('/showallproducts/:id', productController.showAllProducts)

module.exports=router;