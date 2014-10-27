var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '../views/', 'templates')
  , emailTemplates = require('email-templates')
  , nodemailer     = require('nodemailer');

module.exports = {

  send : function (obj){
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

        // Send a single email
        template(obj.template, obj.locals, function(err, html, text) {
          if (err) {
            console.log(err);
          } else {
            transport.sendMail({
              from: 'HNEC <hnec.dev@gmail.com>',
              to: obj.locals.email,
              subject: obj.subject,
              html: html,
              generateTextFromHTML: true,
              text: text
            }, function(err, responseStatus) {
              if (err) {
                console.log(err);
                return false;
              } else {
                console.log(responseStatus.message);
                return true;
              }
            });
          }
        });
      }
    });
  }
}

 
