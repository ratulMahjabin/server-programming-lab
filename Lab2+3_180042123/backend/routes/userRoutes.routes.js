const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile("home.html", { root: "./views" });
});

router.get("/dashboard", (req, res) => {
    res.sendFile("index.html", { root: "./views" });
});

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "./views" });
});

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "./views" });
});

router.post('/', (req, res) => {
    res.send("<H1> Home page- post req </H1>");
});

router.use((req, res) => {
    res.send("Page doesn't exist!");
});

module.exports = router;