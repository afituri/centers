var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")(),
  mailer = require('../app/mailer');
  userMgr = require('../app/user').userMgr;

module.exports = {
  /* here we add a new user to the system */
  addUser: function (req, cb) {
    var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
        password = generatePassword(); //we generate a new password for every new user
    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
            name : req.body.name,
            email : req.body.email,
            password : passwordHash,
            phone : req.body.phone,
            salt : originalSalt,
            level : req.body.level
          }
      userMgr.addUser(obj, function(result){
        var obj = {
          template : "newpassword",
          subject : "Your HNEC app credentials",
          locals : {
            email : req.body.email,
            user : {
              email : req.body.email,
              password : password
            }
          }
        }
        mailer.send(obj); // here we send an email with user's credintials
        cb(true);  
        //to do list
        //1- if level is 2 "manager" then check if constit has a manager first if not then assign a manager to that constit
      });
    });
  },
};