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
router.post('/mystores',  function(req,res){
    var info=[];
    info['email']= req.body.email;
    info['storename']=req.body.storename
    info['type']=req.body.type 
    info['description']=req.body.description
    info['filename']= req.body.filename


    User.addstoreinfo(info ,function(err,instructor){
        if(err){console.log(err)}
        
    });
    res.render('../views/addedSuccessfullu');
    
    
    
    });

module.exports=router;

