const MathOlympiad = require('../models/MathOlympiad.model')
const getMO = (req, res) => {
  res.render('math-olympiad/register.ejs', { error: req.flash('error') })
}

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
  let error = ''

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
      })
      participant
        .save()
        .then(() => {
          error = 'Participant has been registered successfully!!'
          req.flash('error', error)
          res.redirect('/MathOlympiad/register')
        })
        .catch(() => {
          error = 'Unexpected error occured while registering!'
          req.flash('error', error)
          res.redirect('/MathOlympiad/register')
        })
    }
  })
}

const getMOList = (req, res) => {
  res.render('math-olympiad/list.ejs')
}
const deleteMO = (req, res) => {
  const id = req.params.id
  console.log(id)
  res.render('math-olympiad/list.ejs')
}
module.exports = { getMO, postMO, getMOList, deleteMO }
