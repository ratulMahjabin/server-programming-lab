const express = require('express')
const router = express.Router()

const {
  ensureAuthenticated,
  addUserData,
} = require('../middlewares/auth.middleware')

const {
  getPC,
  postPC,
  getPCList,
  paymentDonePC,
} = require('../controllers/progContest.controller')

router.get('/register', ensureAuthenticated, addUserData, getPC)
router.post('/register', ensureAuthenticated, addUserData, postPC)
router.post('/list', ensureAuthenticated, addUserData, getPCList)
router.get('/list', ensureAuthenticated, addUserData, getPCList)
router.get('/paymentDone/:id', ensureAuthenticated, addUserData, paymentDonePC)

module.exports = router
