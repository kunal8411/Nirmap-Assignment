const Products = require('../models/product')
const Product= require('../models/product')

//add page for products
module.exports.addproducts=function(req,res){
    return res.render('../views/addproducts')
}

//post form to add the products into store
module.exports.addProductsIntoStore=function(req,res){
    Product.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log('error finding in user in sign up');
            return; 
     
        }
        console.log("store id is",req.body.storeid)
        if(!user){

        Products.create({
            storeId:req.body.storeid,
            email:req.body.email
        }, function(err,user){
            if (err){console.log('error in adding products itno store', err);  return }


             return res.render('../views/addedSuccessfullu'); 
        })

        }else{
            return res.redirect('back')
        }
    })
}