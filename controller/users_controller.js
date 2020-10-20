const User= require('../models/user');

module.exports.signup= function(req,res){
    res.render('../views/signup')
}

module.exports.signin=function(req,res){
    res.render('../views/signin')
}

//post method for signup page  
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirmpassword){
        return res.redirect('back');

    }  

    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error finding in user in sign up');
            return; 
     
        }
        if(!user){
            User.create({
                email:req.body.email,
                password:req.body.password,
                name:req.body.name,
                streetaddress:req.body.street_address,
                city:req.body.city,
                state:req.body.state,
                zip:req.body.zip,
                phoneno:req.body.phoneno

            }, function(err,user){
                if (err){console.log('error in creating user while signing up');  return }
                // req.flash('success','user created')
                return res.redirect('/'); 
            })
        }
        else{
            return res.redirect('back'); 
            
        }
    });

}

//post method for login page 
module.exports.createsession= function(req,res){
    return res.redirect('/');
}


//sign-out controller
module.exports.destroySession= function(req,res){
    //this is by default method provided by passoport 
    req.logout();
    console.log("sign out succesfully")
    return res.redirect('/');
}


//addstoreinfo page
module.exports.addstorepage=function(req,res){
    return res.render('../views/addStoreInfo')
}