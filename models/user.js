
const mongoose= require('mongoose');

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
        }
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
    

    var query= {email:email}
    Users.findOneAndUpdate(
        query,
        {$push:{"storeInfo":{storeName:storename, description:description,storeCategory:type}}},
        {safe: true, upsert: true},
        callback
    )
}