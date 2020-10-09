const User = require('../models/user')

module.exports.mystores= async function(req,res){
    try{
        let users=await User.findById(req.params.id);
            
        return res.render('../views/mystores',{
              users:users.storeInfo
        });


    }catch(err){
        console.log('Error',err);
        return;
    }

    let users=await User.findById(req.params.id);
    // User.findOne({email: req.body.email},function(err,user){
    //     if(err){
    //         console.log('error in finding user', err);
    //         return; 
     
    //     }
        
    //     return res.render('../views/mystores',{
    //         users:user.storeInfo
    //     });
    // });
    res.render('../views/mystores')
}