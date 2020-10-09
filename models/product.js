
const mongoose= require('mongoose');
const path= require('path');

const productSchema = new mongoose.Schema({
    
    storeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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