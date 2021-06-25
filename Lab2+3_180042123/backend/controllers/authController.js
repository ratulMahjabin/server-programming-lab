const userSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const alert = require('alert');
var LocalStorage = require("node-localstorage").LocalStorage;
const getRegister = (req, res) => {
    res.sendFile("register.html", { root: "./views" });
};

const postRegister = async (req, res) => {
    const { fullname, email, password, confirmpass } = req.body;

    // new user json 
    if (String(fullname).length == 0 || String(email).length == 0 || String(password).length == 0 || String(confirmpass).length == 0) {
        alert('Require all field');
        res.redirect('/register');
    }

    else {
        const bool = await userSchema.findOne({ email });
        if (bool) {
            alert('Email already exist..try again');
            return res.redirect('/register');
        }

        if (password.length < 8) {
            alert('passworld length should be atleast 8');
            return res.redirect('/register');
        }

        if (password == confirmpass) {
            alert('password does not match');
            return res.redirect('/register');
        }

        const passwordEncrypted = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            fullname: fullname,
            email: email,
            password: passwordEncrypted
        });

        newUser.save()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
};

const getLogin = (req, res) => {
    res.sendFile("login.html", { root: "./views" });
};

const postLogin = (req, res) => {
    console.log(req.body);
};

const getDashboard = (req, res) => {
    res.sendFile("index.html", { root: "./views" });
};

const getHomePage = (req, res) => {
    res.sendFile("home.html", { root: "./views" });
};

module.exports = { getDashboard, getHomePage, getLogin, getRegister, postLogin, postRegister };