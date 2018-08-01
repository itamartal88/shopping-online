
var emailExistence = require('email-existence');
var nodemailer = require('nodemailer');

function sendEmail(name,email){
    emailExistence.check(email, function(error, response){
      if(response){
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'itamarStore1@gmail.com',
            pass: 'messilot123'
          }
        });
        var mailOptions = {
          from: 'talitamar91@gmail.com',
          to: email,
          subject: 'hey ' + name + ', thanks for registerd at our shop!',
          text: 'have a great day!'
        };
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
       }
    });
  }

  module.exports = {
    sendEmail  
}
  