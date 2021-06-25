const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<H1> Home page </H1>");
});

app.get("/dashboard", (req, res) => {
    res.send("<H1>Dashboard</H1>");
});

app.get("/login", (req, res) => {
    res.send("<H1>Login Page</H1>");
});

app.get("/register", (req, res) => {
    res.send("<H1>Register Page</H1>");
});

app.use((req, res) => {
    res.send("Page doesn't exist!");
});

module.exports = app;