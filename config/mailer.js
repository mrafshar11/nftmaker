const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hadiansari1779@gmail.com',
    pass: 'gnakcibatjqacgap'
  }

});


exports.sendEmail = (email, token) => {
    return transporter.sendMail({
      from: 'hadiansari1779@gmail.com',
      to: email,
      subject: 'کد تایید اعتیار',
      html: `http://localhost:3000/api/verify/${token}`
    })
  }


  exports.sendResetPassEmail = (email, token) => {
    return transporter.sendMail({
      from: 'hadiansari1779@gmail.com',
      to: email,
      subject: 'کد تایید اعتیار',
      html: `http://localhost:3000/resetPassword/${token}`
    })
  }