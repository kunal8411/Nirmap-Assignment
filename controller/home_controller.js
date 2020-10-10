
const User = require('../models/user')
module.exports.home=function(req,res){
     
    // if(req.user.storeInfo.length ==0){
    //     res.render('../views/home')
    // }else{
    //     res.render('../views/homestore')
    // }
     res.render('../views/home')
    
}