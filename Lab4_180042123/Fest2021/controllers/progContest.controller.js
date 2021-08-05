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
        })
        participant
          .save()
          .then(() => {
            error =
              'Team for Programming Contest has been registered successfully!!'
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

module.exports = { getPC, postPC, getPCList }
