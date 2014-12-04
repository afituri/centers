var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    easyPbkdf2 = require("easy-pbkdf2")(),
    userMgr = require('../app/user').userMgr;
var logMgr = require('../app/log').repoMgr;


//read the passport api docs if you wanna know what this does
passport.use(new LocalStrategy(
  function(username, password, done) {
    findByEmail(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      authenticate(user,password, function(valid){
        if(valid){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));
//read the passport api docs if you wanna know what this does
passport.serializeUser(function(user, done) {
  done(null, user.iduser);
});
//read the passport api docs if you wanna know what this does
passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = function (router) {
  //login here we get the email and password and check if they're conrrect
  router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }), function(req, res) {
    findById(req.session.passport.user, function (err, user) {
      req.session.email=user.email;
      req.session.iduser=user.iduser;
      req.session.level=user.level;
      req.session.office_idoffice=user.office_idoffice;
      req.session.name=user.name;
      req.session.back="ssssss";
      logMgr.insertLog(user.iduser,"login","user",user.name+" has login",user.iduser,user.name);
      if(user.level == 0){
        res.redirect('/cpanel');
      }else{
        if(user.level == 1){
          res.redirect('/cpanel/cpanelAdmin');
        }else{
          if(user.level == 2){
            res.redirect('/office/'+user.office_idoffice);
          }
        }
      }
    });
  });
  // here if a user wants to logout of the app
  router.get('/logout',ensureAuthenticated, function(req, res) {
    logMgr.insertLog(req.session.iduser,"logout","user",req.session.name+" has logout",req.session.iduser,req.session.name);
    req.session.destroy();
    res.redirect('/users/login');
  });
  return router;
}

function findById(id, fn) {
  userMgr.getUserById(id, function(user){
    if(user){
      fn(null, user);
    } else {
      fn(new Error('User ' + id + ' does not exist'));
    }
  });
}
function findByEmail(email, fn) {
  userMgr.getUserByEmail(email, function(user){
    if(user) {
      return fn(null, user);
    } else {
      return fn(null, null);
    }
  });
}

function authenticate( user, userEnteredPassword, callback) {
  // make sure the user-entered password is equal to the previously
  // created hash when hashed with the same salt.
  easyPbkdf2.verify( user.salt, user.password, userEnteredPassword, function( err, valid ) {
      callback(valid);
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/users/login')
}
