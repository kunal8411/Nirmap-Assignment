
const mongoose= require('mongoose');
const path= require('path');

const productSchema = new mongoose.Schema({
    
    storeId:{
        type: String
        
    },  
    email:{
        type:String
    },
    productInfo:[{
        
        title:{
            type:String
        },
        price:{
            type:String
        },
        productImage:{
            type:String
        }
       
    }]
    
},  {
        timestamps: true
});


const Products=mongoose.model('Products',productSchema); 

module.exports= Products;


module.exports.addProductinfo= function(info, callback ){
    title= info['title'];
    price=info['price'];
    productImage=info['productImage'];
    email= info['email']
    storeId= info['storeId']
    var query= {storeId:storeId}
    Products.findOneAndUpdate(
        query,
        {$push:{"productInfo":{
            title:title,
            price:price,
            productImage:productImage

            }}},
        {safe: true, upsert: true},
        callback
    )
    
}