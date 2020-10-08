const passport= require('passport');

const LocalStrategy= require('passport-local').Strategy;

const User= require('../models/user');


//authentication using passport
//telling passport to use local Strategy 
passport.use(new LocalStrategy({
    usernameField:'email' ,
    passwordField: 'password',
    passReqToCallback: true   //now we can add req as a 4th parameter in call back function to 
                              //show flash messages    

    },
    //callback function to find username,password
    //done is callback function reporting to passport js
    function(req,email , password , done){
        //find user and establish identity in mongodb/database
        // second email is value we have passed in call back function & first email is property in db 
        User.findOne({email:email},function(err,user) {
            if(err){
                req.flash('error', err);
                return done(err);
 
            }
            if(!user ||  user.password != password){
               console.log("invalid username/password")
                //false means authentication failse here
                return done(null,false);


            }
            //if user find
            return done(null, user);
            console.log(user);
            
        });
    }
));

//serializing the user to decide which key is to be kept in the cookies
//which property to send to cookie is defined here 
passport.serializeUser(function(user,done){
    done(null,user.id);

});

//deseializing the user from the key in the cookies
//when request ges to serer, use the key from cookies
//check id is present or not 
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('error in finding user');
            return done(err);

        }

        return done(null,user);
    });
});


//check if user is authenticated or not
////checkAuthentication-> is not a build in function,  we are creating on top of passport
//use this function in user.js whenever we only want to show page when user is loged in
passport.checkAuthentication= function(req,res,next){
    //if user is signed in, then pass the the request to next function(controller's action)
    //req.isAuthenticated() is used to check is request is authenticated or not,user has signed up or not?
    if(req.isAuthenticated()){
        return next();

    }

    //if user is not signed in 
    return res.redirect('/users/signin');

}


//isAuthenticateduser-> is not a build in function,  we are creating on top of passport
passport.setAuthenticateduser= function(req, res, next){
    if(req.isAuthenticated()){
      res.locals.user=req.user;
     }
    next();
}


module.exports=passport;