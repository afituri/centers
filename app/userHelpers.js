var generatePassword = require('password-generator'),
  easyPbkdf2 = require("easy-pbkdf2")(),
  mailer = require('../app/mailer');
  userMgr = require('../app/user').userMgr;

module.exports = {
  /* here we add a new user to the system */
  addUser: function (body, cb) {
    var salt = easyPbkdf2.generateSalt(), //we generate a new salt for every new user
        password = generatePassword(); //we generate a new password for every new user
    console.log("password : "+password);
    easyPbkdf2.secureHash( password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
            name : body.name,
            email : body.email,
            password : passwordHash,
            phone : body.phone,
            salt : originalSalt,
            level : body.level
          }
      userMgr.addUser(obj, function(result){
        console.log(result);
        var obj = {
          template : "newpassword",
          subject : "Your HNEC app credentials",
          locals : {
            email : body.email,
            user : {
              email : body.email,
              password : password
            }
          }
        }
        mailer.send(obj);
        cb(true);  
        //to do list
        //1- if level is 2 "manager" then check if constit has a manager first if not then assign a manager to that constit
        //2- if true we should send an email to the user with the generated password
      });
    });
  },
};