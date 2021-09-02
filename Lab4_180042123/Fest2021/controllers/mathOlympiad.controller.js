const crypto = require('crypto')
const nodemailer = require('nodemailer')
require('dotenv').config()
const Email = process.env.Email
const Password = process.env.Password

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Email,
    pass: Password,
  },
})

const MathOlympiad = require('../models/MathOlympiad.model')
const getMO = (req, res) => {
  res.render('math-olympiad/register.ejs', { error: req.flash('error') })
}

// const postMO = (req, res) => {
//   const { name, category, contact, email, institution, tshirt } = req.body
//   let registrationFee = 0
//   if (category == 'School') {
//     registrationFee = 250
//   } else if (category == 'College') {
//     registrationFee = 400
//   } else {
//     registrationFee = 500
//   }
//   const total = registrationFee
//   const paid = 0
//   const selected = false
//   const HashValue = crypto.randomBytes(20).toString('hex')
//   const ConfirmationCode = Math.floor(1000 + Math.random() * 9000)
//   let error = ''
//   const verified = false

//   console.log(Password)

//   MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
//     if (participant) {
//       error = 'Participant with this name and contact already exists!'
//       req.flash('error', error)
//       res.redirect('/MathOlympiad/register')
//     } else {
//       const participant = new MathOlympiad({
//         name,
//         category,
//         contact,
//         email,
//         institution,
//         paid,
//         total,
//         selected,
//         tshirt,
//         ConfirmationCode: ConfirmationCode,
//         HashValue: HashValue,
//         verified: verified,
//       })

//       participant
//         .save()
//         .then(() => {
//           error = 'Participant has been registered successfully!!'

//           const options = {
//             to: email,
//             from: Email,
//             subject: 'Registration is Successful!',
//             text: `Hello ${name},
//             You have successfully registered to ${category} category and your confirmation code is ${ConfirmationCode}`,
//           }

//           transporter.sendMail(options, function (err, info) {
//             if (err) {
//               console.log(err)
//               return
//             }
//             console.log('Sent: ' + info.response)
//           })

//           req.flash('error', error)
//           res.redirect('/MathOlympiad/register')
//         })
//         .catch(() => {
//           error = 'Unexpected error occured while registering!'
//           req.flash('error', error)
//           res.redirect('/MathOlympiad/register')
//         })
//     }
//   })
// }

const postMO = (req, res) => {
  const { name, category, contact, email, institution, tshirt } = req.body
  let registrationFee = 0
  if (category == 'School') {
    registrationFee = 250
  } else if (category == 'College') {
    registrationFee = 400
  } else {
    registrationFee = 500
  }
  const total = registrationFee
  const paid = 0
  const selected = false
  const confirmationCode = Math.floor(1000 + Math.random() * 9000)
  const hashValue = crypto.randomBytes(20).toString('hex')
  let error = ''
  const verified = false

  console.log(Password)

  MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      error = 'Participant with this name and contact already exists!'
      req.flash('error', error)
      res.redirect('/MathOlympiad/register')
    } else {
      const participant = new MathOlympiad({
        name,
        category,
        contact,
        email,
        institution,
        paid,
        total,
        selected,
        tshirt,
        confirmationCode: confirmationCode,
        verified: verified,
        hashValue: hashValue,
      })
      participant
        .save()
        .then(() => {
          error = 'Participant has been registered successfully!!'

          const options = {
            to: email,
            from: Email,
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

          req.flash('error', error)
          res.redirect('/MathOlympiad/register')
        })
        .catch((err) => {
          console.log(err)
          error = 'Unexpected error occured while registering!'
          req.flash('error', error)
          res.redirect('/MathOlympiad/register')
        })
    }
  })
}

const getMOList = (req, res) => {
  let all_participant = []
  let error = ''
  MathOlympiad.find()
    .then((data) => {
      all_participant = data
      res.render('math-olympiad/list.ejs', {
        error: req.flash('error'),
        participants: all_participant,
      })
    })
    .catch(() => {
      error = 'Failed to fetch data!'
      res.render('math-olympiad/list.ejs', {
        error: req.flash('error', error),
        participants: all_participant,
      })
    })
  // res.render("math-olympiad/list.ejs");
}

const deleteMO = (req, res) => {
  const id = req.params.id
  console.log(id)
  MathOlympiad.deleteOne({ _id: req.params.id })
    .then(() => {
      let error = 'Data deleted successfully!'
      req.flash('error', error)
      res.redirect('/MathOlympiad/list')
    })
    .catch(() => {
      let error = 'Failed to delete data!'
      req.flash('error', error)
      res.redirect('/MathOlympiad/list')
    })
}

const paymentDoneMO = (req, res) => {
  const id = req.params.id

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total
      participant
        .save()
        .then(() => {
          let error = 'Payment completed succesfully'
          req.flash('error', error)
          res.redirect('/MathOlympiad/list')
        })
        .catch(() => {
          let error = 'Data could not be updated'
          req.flash('error', error)
          res.redirect('/MathOlympiad/list')
        })
    })
    .catch(() => {
      let error = 'Data could not be updated'
      req.flash('error', error)
      res.redirect('/MathOlympiad/list')
    })
}

const getEditMO = (req, res) => {
  const id = req.params.id
  // const tshirt=req.params.tshirt
  //console.log('wd ', id, '  ')
  let info = []
  MathOlympiad.findOne({ _id: id })
    .then((data) => {
      info = data
      // console.log("info ", info);
      res.render('math-olympiad/edit-participant.ejs', {
        error: req.flash('error'),
        participant: info,
      })
    })
    .catch((e) => {
      console.log(e)
      error = 'Failed to fetch participants'
      res.render('math-olympiad/edit-participant.ejs', {
        error: req.flash('error', error),
        participant: info,
      })
    })
}

const postEditMO = async (req, res) => {
  const { name, contact, category, email, institution, tshirt } = req.body

  const data = await MathOlympiad.findOneAndUpdate(
    { name: name, contact: contact },
    { category, email, institution, tshirt },
    { useFindAndModify: false }
  )
  if (data) {
    res.redirect('/MathOlympiad/list')
  }
}

const selectMO = (req, res) => {
  const id = req.params.id

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true
      participant
        .save()
        .then(() => {
          let error = 'Participant has been selected succesfully'

          const options = {
            to: participant.email,
            from: 'iutict2021@outlook.com',
            subject: 'You have been Selected!',
            text:
              'Dear ' +
              participant.name +
              ', \n' +
              'Congratulations! Your have been selected for the Math Olympiad in ICT Fest, 2021 is successful.',
          }

          transporter.sendMail(options, function (err, info) {
            if (err) {
              console.log(err)
              return
            }
            console.log('Sent: ' + info.response)
          })

          req.flash('error', error)
          res.redirect('/MathOlympiad/list')
        })
        .catch(() => {
          let error = "Error Occured Participant couldn't be selected"
          req.flash('error', error)
          res.redirect('/MathOlympiad/list')
        })
    })
    .catch(() => {
      let error = 'Unknown Error occured and Participant was not found.'
      req.flash('error', error)
      res.redirect('/MathOlympiad/list')
    })
}

const getVerifyMO = (req, res) => {
  const id = req.params.id

  let info = []
  MathOlympiad.findOne({ _id: id })
    .then((data) => {
      info = data
      // console.log('info ', info)
      res.render('math-olympiad/verification.ejs', {
        error: req.flash('error'),
        participant: info,
      })
    })
    .catch((e) => {
      console.log(e)
      error = 'Failed to fetch participants'
      res.render('math-olympiad/verification.ejs', {
        error: req.flash('error', error),
        participant: info,
      })
    })
}

const postVerifyMO = (req, res) => {
  const id = req.params.id
  let error = ''

  //console.log(id)

  MathOlympiad.findOne({ _id: id }).then((participant) => {
    if (participant) {
      const { verification } = req.body
      if (participant.confirmationCode == verification) {
        participant.verified = true
        participant
          .save()
          .then(() => {
            error = 'Participant is verified successfully.'
            req.flash('error', error)

            console.log(error)
            res.redirect('/MathOlympiad/list')
          })
          .catch(() => {
            error = 'Unknown Error occured and participant was not verified.'
            req.flash('error', error)

            console.log(error)
            res.redirect('/MathOlympiad/verify/:id')
          })
      } else {
        error = 'Verification code does not match'
        req.flash('error', 'Verification code does not match')

        console.log(error)
        res.redirect('back')
      }
    } else {
      error = 'Unknown Error occured and Data was not Edited.'
      req.flash('error', error)

      console.log(error)
      res.redirect('/MathOlympiad/list')
    }
  })
}

module.exports = {
  getMO,
  postMO,
  getMOList,
  deleteMO,
  paymentDoneMO,
  selectMO,
  getEditMO,
  postEditMO,
  getVerifyMO,
  postVerifyMO,
}
