const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port:465,
  secure: true, // true for 465, false for other ports
  // logger: true,
  // debug: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }

});


exports.sendEmail = (email, token) => {
    return transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Versai AI Email Verification',
      html: `Please Verify Your Email:  <br /> ${process.env.BASE_URL}/api/verify/${token}`
    })
  }


  exports.sendResetPassEmail = (email, token) => {
    return transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Versai AI, Email Verification',
      html: `${process.env.BASE_URL}/resetPassword/${token}`
    })
  }