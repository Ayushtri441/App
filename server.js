const express = require('express');
const passport = require('passport');
const  session  = require('express-session');
const path = require('path')
const app = express();
require('./auth')
app.use(express.json())
app.use(express.static(__dirname))
function isLoggedin(req,res,next){
    req.user ? next() : res.sendStatus(401);
}
app.get('/',(req,res)=>{
    res.sendFile('index.html')
})
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
app.use(passport.initialize())
app.use(passport.session())
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
app.get( '/auth/google/failure',
    passport.authenticate( 'google', (req,res)=>{
        res.send("Something went wrong")
    }));
app.get( '/auth/google/failure',(req,res)=>{ res.send("Something went wrong")}       
    );
app.get('/auth/google/success',isLoggedin,(req,res)=>{ 
        console.log(req)
       // res.send(JSON.stringify(req.user))
        res.send(`Hello ${req.user.displayName} \n Email:-${req.user.email}`)
    }
   
       
    );
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})