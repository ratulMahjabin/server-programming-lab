const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

var LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const alert = require('alert');



const isLoggedIn = (req, res, next) => {

    const user = localStorage.getItem("fullname");

    if (user) {
        res.clearCookie('user');
        res.cookie("user", user);
        next();
    } else {
        alert('Please log in first');
        res.redirect('/login');
    }
};

module.exports = isLoggedIn;