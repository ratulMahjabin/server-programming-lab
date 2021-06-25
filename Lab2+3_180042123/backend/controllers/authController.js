const userSchema = require('../models/userModel');

const getRegister = (req, res) => {
    res.sendFile("register2.html", { root: "./views" });
};

const postRegister = async (req, res) => {
    const { fullname, email, password, confirmpass } = req.body;
    // new user json 
    const newUser = { fullname: fullname, email: email, password: password };
    console.log(newUser);

    const regUser = new userSchema(newUser);
    regUser.save()
        .then(data => res.json(data))
        .catch(error => res.json(error));

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