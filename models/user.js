
const mongoose= require('mongoose');
const path= require('path');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    streetaddress:{
        type: String,
        
    },
    city:{
        type: String,
        
    },
    state:{
        type: String,
        
    },
    zip:{
        type: String,
        
    },  
    phoneno:{
        type: String,
        
    },
    
    storeInfo:[{
        storeName:{
            type:String
        },
        description:{
            type:String
        },
        image:{
            type:String
        },
        storeCategory:{
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
       
    }]
    
},  {
        timestamps: true
});


const Users=mongoose.model('Users',userSchema); 

module.exports= Users;


module.exports.addstoreinfo= function(info, callback ){
    email= info['email'];
    storename=info['storename'];
    type=info['type'];
    description= info['description'];
    filename=info['filename']

    var query= {email:email}
    Users.findOneAndUpdate(
        query,
        {$push:{"storeInfo":{
             storeName:storename,
             description:description,
             storeCategory:type,
             image:filename
            }}},
        {safe: true, upsert: true},
        callback
    )
    
}