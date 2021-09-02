const mongoose = require('mongoose')

const mathOlympiadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  tshirt: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  confirmationCode: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  hashValue: {
    type: String,
    required: true,
  },
})

const MathOlympiad = mongoose.model('math-olympiad', mathOlympiadSchema)
module.exports = MathOlympiad
