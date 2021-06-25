const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<H1> Home page </H1>");
});

module.exports = app;