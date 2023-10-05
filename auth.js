const passport = require('passport');

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     "606710661978-6ejkf627fc36lti2ja67qspnpoohh5lp.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

      done(null, profile);

  }
));
passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser((user,done)=>{
  done(null,user)
})