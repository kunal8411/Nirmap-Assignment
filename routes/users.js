const express= require('express');
const { get } = require('mongoose');
const router= express.Router();
const User= require('../models/user')
const passport= require('passport');

const userController = require('../controller/users_controller')

router.get('/signup', userController.signup )
router.get('/signin', userController.signin)
router.post('/create', userController.create); 
router.post('/createsession', passport.authenticate(
    'local',
    {
        failureRedirect: '/users/signin'
        
    },
), userController.createsession);

router.get('/signout', userController.destroySession)

//send data to google 
router.get('/auth/google',passport.authenticate('google',
        
        {scope:['profile','email']}));

//callback url 
router.get('/auth/google/callback',passport.authenticate('google',
        {failureRedirect:'/users/signin'}),
        userController.createsession)


//get-- addstore info page
router.get('/addstoreinfo', userController.addstorepage)

//add the info of store data into database
router.post('/addstoreinfo', function(req,res){
    var info=[];
    info['email']= req.body.email;
    info['storename']=req.body.storename
    info['type']=req.body.type
    info['description']=req.body.description
    User.addstoreinfo(info, function(err,user){
        if(err){console.log(err)}
        
    });
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user', err);
            return; 
     
        }
        
        return res.render('../views/mystores',{
            users:user.storeInfo
        });
    });
    
})

module.exports=router;

