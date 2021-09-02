const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'iutict2021@outlook.com',
    pass: 'z+<=i=TX7M;W,2d',
  },
})

function mailSender(name, email, category, confirmationCode) {
  const options = {
    to: email,
    from: 'iutict2021@outlook.com',
    subject: 'Registration is Successful!',
    text: `Heelo ${name},
            You have successfully registered to ${category} category and your confirmation code is ${confirmationCode}`,
  }

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Sent: ' + info.response)
  })
}
module.exports = { mailSender }
