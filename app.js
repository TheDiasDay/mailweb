var nodemailer = require('nodemailer');
var ejs = require('ejs');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Load the email template
ejs.renderFile(__dirname + '/email.ejs', { 
  title: 'Email Template Example',
  heading: 'Welcome to our service!',
  content: 'This is a test email using a template.' 
}, function(err, data){
  if (err) {
    console.log(err);
  } else {
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kenzhebaev032@gmail.com',
      subject: 'Sending Email using Node.js',
      html: data // Use rendered HTML from the template
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
