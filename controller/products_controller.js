const User=require('../models/user')
const Product= require('../models/product');




//add page for products
module.exports.getAddProductsPage=function(req,res){
    const storeId=req.params.id;
    
    return res.render('../views/addproducts',{
        storeId:storeId
    })
}

//post form to add the products into store
module.exports.addProductsIntoStore= async function(req,res){
    
    
    // const newuser =await User.findOne({email:req.body.email})
    // // console.log(newuser)
    // // let user= await User.findOne({storeInfo: {$elemMatch: {storeName:"surface ",_id:req.params.id}}})
    // objArray=newuser.storeInfo
    // obj = objArray.find(obj => obj._id == req.params.id);
    
    // var query= {email:req.body.email}
    // const productInfoNew =obj.productInfo
    // var query= {_id:obj._id}
    //  console.log(obj._id)

    Product.findOne({storeId: req.params.id},function(err,user){
        
        if(err){
            console.log('error finding in product');
            return; 
     
        }
        console.log("store id is",req.params.id)
        if(!user){
            Product.create({
                email:req.body.email,
                storeId:req.params.id

            }, function(err,user){
                if (err){console.log('error in creating a product');  return }
                //return res.redirect('back');
           
           
            info=[];
            info['title']=req.body.productname
            info['price']=req.body.price
            info['productImage']=req.body.filename
            info['email']=req.body.email
            info['storeId']=req.params.id
             Product.addProductinfo(info ,function(err,user){
            if(err){console.log(err)}
            
          });
        })
                return res.redirect('back')
         }else{
            info=[];
            info['title']=req.body.productname
            info['price']=req.body.price
            info['productImage']=req.body.filename
            info['email']=req.body.email
            info['storeId']=req.params.id
            Product.addProductinfo(info ,function(err,user){
                if(err){console.log(err)}
            
            });
         }
        
         
        return res.redirect('back')
    })
    
    
        
    
    
}


//to see all the products 
module.exports.showAllProducts= async function(req,res){
    
    const product = await Product.findOne({storeId: req.params.id})
   
    var newobjArray=product.productInfo
    
    return res.render('../views/myproducts',{
        users:newobjArray
    })
}