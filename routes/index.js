var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('./users');
var googleAuth = require('passport-google-oauth20').Strategy;
passport.use(
  new googleAuth({
    clientID : '727704263479-n0b941dpdpuv573fki4hh5020sl2mqvm.apps.googleusercontent.com',
    clientSecret : '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',
    callBackURL: 'http://localhost:3000/auth'
  },function(accessToken,refreshToken,profile,done){
    console.log('working');
    userModel.findOne({googleID: profile.id})
    .then(function(founduser){
      if(founduser){
        done(null,founduser)
      }
      else{
        new userModel({
          googleID: profile.id
        })
        .save()
        .then(function(newuser){
          done(null,newuser)
        })
      }
    })
  })
)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/auth',passport.authenticate('google',{failureRedirect:'/localhost:3000/'}), function(req,res,next){
  res.render('profile')
});

router.get('/google', passport.authenticate('google', {
  scope:['profile','email']
}),function(req,res){
})


module.exports = router;
