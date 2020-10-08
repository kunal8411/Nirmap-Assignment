const express = require('express');
const port =8080;
const app=express();
const path= require('path');
app.use(express.urlencoded());

const session= require('express-session');
const MongoStore=require('connect-mongo')(session);


const cookieParser= require('cookie-parser');


const expressLayout=require('express-ejs-layouts');
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(cookieParser());

const passport= require('passport');
const passportGoogle=require('./config/passport-google-oauth2-strategy');   
const passportLocal= require('./config/passport-local-strategy');


app.use(express.static('./assets'));
const mongoose= require('./config/mongoose');

//to render ejs files
app.set('views','./views');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(session({
    secret:'abcdefghijk',
    saveUninitialized:'false',
    resave:'false',
    cookie:{
        //milliseconds, max age of cookie specified here 
       maxAge:(1000 * 60 * 100)
   },
   store:new MongoStore(
    {
         mongooseConnection:mongoose,
         autoRemove: 'disabled'

    },
    function(err){
        console.log(err || 'connect-mongoose setup OK')
    }

)
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateduser);



app.use('/',require('./routes/index'));

app.listen( port ,function(err){
    if(err){
        console.log('server will not run on this port:',port );

    }

    console.log('server is running on port:',port);

})
