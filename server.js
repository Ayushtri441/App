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
        var user = req.user
        //req.session.user = user;
       // res.send(JSON.stringify(req.user))
       res.send(`<h1>Welcome to your profile</h1>
       <p>Email: ${user.email}</p>
       <p>Name: ${user.displayName}</p>
       <a href="auth/logout">Logout</a>
       `)
    }
    );
    app.get('/auth/google/auth/logout',(req,res)=>{
        req.session.destroy();
        res.send("Logout Sucessful");
    })
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})