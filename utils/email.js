const nodemailer = require('nodemailer');

const sendEmail = async options => {
  var transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD
    }
  });
  // 3 dinh nghia mail options
  const mailOptions = {
    from: 'Le Thanh Tung<lethanhtung12a1la18@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  //3 send email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
