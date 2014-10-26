var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '../views/', 'templates')
  , emailTemplates = require('email-templates')
  , nodemailer     = require('nodemailer');

module.exports = {

  sendPassword : function (obj,cb){
    emailTemplates(templatesDir, function(err, template) {
      if (err) {
        console.log(err);
      } else {

        // Prepare nodemailer transport object
        var transport = nodemailer.createTransport("SMTP", {
          service: "Gmail",
          auth: {
            user: "hnec.dev@gmail.com",
            pass: "Hn3c$3cur3d"
          }
        });

        // An example users object with formatted email function
        var locals = {
          email: obj.email,
          user: {
            email: obj.email,
            password: obj.password
          }
        };

        // Send a single email
        template(obj.template, locals, function(err, html, text) {
          if (err) {
            console.log(err);
          } else {
            transport.sendMail({
              from: 'HNEC <hnec.dev@gmail.com>',
              to: locals.email,
              subject: obj.subject,
              html: html,
              // generateTextFromHTML: true,
              text: text
            }, function(err, responseStatus) {
              if (err) {
                console.log(err);
                cb(false);
              } else {
                console.log(responseStatus.message);
                cb(true);
              }
            });
          }
        });
      }
    });
  }
}

 
