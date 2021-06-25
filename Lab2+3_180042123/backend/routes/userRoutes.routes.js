const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const {
    getDashboard,
    getHomePage,
    getLogin,
    getRegister,
    postLogin,
    postRegister,
} = require("../controllers/authController");

const pageNotFound = require('../controllers/userController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', getHomePage);

router.get('/dashboard', getDashboard);

router.route('/login').get(getLogin).post(postLogin);

router.route('/register').get(getRegister).post(postRegister);

router.use(pageNotFound);

module.exports = router;
