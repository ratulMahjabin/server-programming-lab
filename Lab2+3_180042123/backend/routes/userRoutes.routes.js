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

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', getHomePage);

router.get('/dashboard', getDashboard);

router.get('/register', getLogin);

router.get('/register', getRegister);
router.post("/", (req, res) => {
    res.send("<H1> Home page- post req </H1>");
});

router.post('/login', postLogin);
router.post('/register', postRegister);
router.use((req, res) => {
    res.send("Page doesn't exist!");
});

module.exports = router;
