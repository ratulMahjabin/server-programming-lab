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
  getEditPC,
  postEditPC,
  deletePC,
  getVerifyPC,
  postVerifyPC,
} = require('../controllers/progContest.controller')

router.get('/register', ensureAuthenticated, addUserData, getPC)
router.post('/register', ensureAuthenticated, addUserData, postPC)
router.post('/list', ensureAuthenticated, addUserData, getPCList)
router.get('/list', ensureAuthenticated, addUserData, getPCList)
router.get('/paymentDone/:id', ensureAuthenticated, addUserData, paymentDonePC)
router.get('/select/:id', ensureAuthenticated, addUserData, selectPC)
router.get('/edit-participant/:id', ensureAuthenticated, addUserData, getEditPC)
router.post('/edit-participant', ensureAuthenticated, addUserData, postEditPC)
router.get('/delete/:id', ensureAuthenticated, addUserData, deletePC)
router.get('/verify/:id', ensureAuthenticated, addUserData, getVerifyPC)
router.post('/verify/:id', ensureAuthenticated, addUserData, postVerifyPC)
module.exports = router
