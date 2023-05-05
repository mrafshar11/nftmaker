const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAI_PASSWORD
  }

});


exports.sendEmail = (email, token) => {
    return transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'کد تایید اعتیار',
      html: `${process.env.BASE_URL}/api/verify/${token}`
    })
  }


  exports.sendResetPassEmail = (email, token) => {
    return transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'کد تایید اعتیار',
      html: `${process.env.BASE_URL}/resetPassword/${token}`
    })
  }