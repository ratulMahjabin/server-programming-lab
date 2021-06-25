require("dotenv").config();
const express = require('express');
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT;



app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});

mongoose.connect(process.env.Database_token, () => {
    console.log("Database connected");
}).catch((error) => console.log(error.message));
