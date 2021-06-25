const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send("<H1> Home page </H1>");
});

router.get("/dashboard", (req, res) => {
    res.send("<H1>Dashboard</H1>");
});

router.get("/login", (req, res) => {
    res.send("<H1>Login Page</H1>");
});

router.get("/register", (req, res) => {
    res.send("<H1>Register Page</H1>");
});

router.post('/', (req, res) => {
    res.send("<H1> Home page- post req </H1>");
});

router.use((req, res) => {
    res.send("Page doesn't exist!");
});

module.exports = router;