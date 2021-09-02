const nodemailer = require('nodemailer')
const crypto = require('crypto')
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

const ProgContest = require('../models/ProgContest.model')

const getPC = (req, res) => {
  res.render('prog-contest/register.ejs', { error: req.flash('error') })
}

const postPC = (req, res) => {
  const {
    teamName,
    institute,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    TLName,
    TLContact,
    TLEmail,
    TLtshirt,
    TM1Name,
    TM1Contact,
    TM1Email,
    TM1tshirt,
    TM2Name,
    TM2Contact,
    TM2Email,
    TM2tshirt,
  } = req.body
  //console.log(teamName)

  const total = 800
  const paid = 0
  const selected = false
  const hashValue = crypto.randomBytes(20).toString('hex')
  const confirmationCode = Math.floor(1000 + Math.random() * 9000)
  const verified = false
  let error = ''

  ProgContest.findOne({ teamName: teamName, institute: institute }).then(
    (team) => {
      if (team) {
        error = 'Team with same name and institution exists'
        req.flash('error', error)
        res.redirect('/progContest/register')
      } else {
        const participant = new ProgContest({
          teamName,
          institute,
          coachName,
          coachContact,
          coachEmail,
          coachTshirt,
          TLName,
          TLContact,
          TLEmail,
          TLtshirt,
          TM1Name,
          TM1Contact,
          TM1Email,
          TM1tshirt,
          TM2Name,
          TM2Contact,
          TM2Email,
          TM2tshirt,
          total,
          paid,
          selected,
          hashValue: hashValue,
          confirmationCode: confirmationCode,
          verified: verified,
        })
        participant
          .save()
          .then(() => {
            error =
              'Team for Programming Contest has been registered successfully!!'

            const emails = [
              { email: coachEmail, name: coachName },
              { email: TLEmail, name: TLName },
              { email: TM1Email, name: TM1Name },
              { email: TM2Email, name: TM2Name },
            ]

            emails.forEach((member) => {
              const options = {
                to: member.email,
                from: Email,
                subject: 'Registration is Successful!',
                text: `Hello ${member.name},
                You have successfully registered to programming contest as Team ${teamName} and your confirmation code is ${confirmationCode}`,
              }

              transporter.sendMail(options, function (err, info) {
                if (err) {
                  console.log(err)
                  return
                }
                console.log('Sent: ' + info.response)
              })
            })

            console.log('save ', error)
            req.flash('error', error)
            res.redirect('/progContest/register')
          })
          .catch(() => {
            error = 'Unexpected error'
            console.log('error ', error)
            req.flash('error', error)
            res.redirect('/progContest/register')
          })
      }
    }
  )
}

const getPCList = (req, res) => {
  let all_participant = []
  let error = ''
  ProgContest.find()
    .then((data) => {
      all_participant = data
      res.render('prog-contest/list.ejs', {
        error: req.flash('error'),
        participants: all_participant,
      })
    })
    .catch(() => {
      error = 'Failed to fetch participants'
      res.render('prog-contest/list.ejs', {
        error: req.flash('error', error),
        participants: all_participant,
      })
    })
  // res.render("math-olympiad/list.ejs");
}

const paymentDonePC = (req, res) => {
  const id = req.params.id

  ProgContest.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total
      participant
        .save()
        .then(() => {
          let error = 'Payment completed succesfully'
          req.flash('error', error)
          res.redirect('/ProgContest/list')
        })
        .catch(() => {
          let error = 'Data could not be updated'
          req.flash('error', error)
          res.redirect('/ProgContest/list')
        })
    })
    .catch(() => {
      let error = 'Data could not be updated'
      req.flash('error', error)
      res.redirect('/ProgContest/list')
    })
}

const selectPC = (req, res) => {
  const id = req.params.id

  ProgContest.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true
      participant
        .save()
        .then(() => {
          let error = 'Participant has been selected succesfully'

          const options = {
            to: participant.TLEmail,
            from: 'iutict2021@outlook.com',
            subject: 'You have been Selected!',
            text:
              'Dear ' +
              participant.teamName +
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
          res.redirect('/ProgContest/list')
        })
        .catch(() => {
          let error = 'Data could not be updated'
          req.flash('error', error)
          res.redirect('/ProgContest/list')
        })
    })
    .catch(() => {
      let error = 'Data could not be updated'
      req.flash('error', error)
      res.redirect('/ProgContest/list')
    })
}

const getEditPC = (req, res) => {
  const id = req.params.id

  //console.log('wd ', id, '  ')
  let info = []
  ProgContest.findOne({ _id: id })
    .then((data) => {
      info = data

      res.render('prog-contest/edit-team.ejs', {
        error: req.flash('error'),
        participant: info,
      })
    })
    .catch((e) => {
      console.log(e)
      error = 'Failed to fetch participants'
      res.render('prog-contest/edit-team.ejs', {
        error: req.flash('error', error),
        participant: info,
      })
    })
}

const postEditPC = async (req, res) => {
  const {
    teamName,
    institute,
    coachName,
    coachContact,
    coachEmail,
    coachTshirt,
    TLName,
    TLContact,
    TLEmail,
    TLtshirt,
    TM1Name,
    TM1Contact,
    TM1Email,
    TM1tshirt,
    TM2Name,
    TM2Contact,
    TM2Email,
    TM2tshirt,
  } = req.body

  // console.log(
  //   teamName,
  //   institute,
  //   coachName,
  //   coachContact,
  //   coachEmail,
  //   coachTshirt,
  //   TLName,
  //   TLContact,
  //   TLEmail,
  //   TLtshirt,
  //   TM1Name,
  //   TM1Contact,
  //   TM1Email,
  //   TM1tshirt,
  //   TM2Name,
  //   TM2Contact,
  //   TM2Email,
  //   TM2tshirt
  // )

  const data = await ProgContest.findOneAndUpdate(
    { teamName: teamName, institute: institute },
    {
      coachName,
      coachContact,
      coachEmail,
      coachTshirt,
      TLName,
      TLContact,
      TLEmail,
      TLtshirt,
      TM1Name,
      TM1Contact,
      TM1Email,
      TM1tshirt,
      TM2Name,
      TM2Contact,
      TM2Email,
      TM2tshirt,
    },
    { useFindAndModify: false }
  )
  if (data) {
    //console.log('findOneAndUpdate prog contest ', data)
    res.redirect('/progContest/list')
  }
}

const deletePC = (req, res) => {
  const id = req.params.id
  //console.log('id ', id)

  let error = ''
  ProgContest.deleteOne({ _id: req.params.id })
    .then(() => {
      error = ''
      req.flash('error', error)
      res.redirect('/progContest/list')
    })
    .catch(() => {
      error = 'Failed to delete data!'
      req.flash('error', error)
      res.redirect('/progContest/list')
    })
}

const getVerifyPC = (req, res) => {
  const id = req.params.id

  let info = []
  ProgContest.findOne({ _id: id })
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

const postVerifyPC = (req, res) => {
  const id = req.params.id
  let error = ''

  //console.log(id)

  ProgContest.findOne({ _id: id }).then((participant) => {
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
        error = 'Verification code doesnot match'
        req.flash('error', 'Verification code doesnot match')

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
  getPC,
  postPC,
  getPCList,
  paymentDonePC,
  selectPC,
  getEditPC,
  postEditPC,
  deletePC,
  getVerifyPC,
  postVerifyPC,
}
