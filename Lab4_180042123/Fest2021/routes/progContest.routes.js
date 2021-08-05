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
  selectPC,
} = require('../controllers/progContest.controller')

router.get('/register', ensureAuthenticated, addUserData, getPC)
router.post('/register', ensureAuthenticated, addUserData, postPC)
router.post('/list', ensureAuthenticated, addUserData, getPCList)
router.get('/list', ensureAuthenticated, addUserData, getPCList)
router.get('/paymentDone/:id', ensureAuthenticated, addUserData, paymentDonePC)
router.get('/select/:id', ensureAuthenticated, addUserData, selectPC)

module.exports = router
