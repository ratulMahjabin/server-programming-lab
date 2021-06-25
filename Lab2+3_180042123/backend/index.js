require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send("<H1> Home page </H1>");
});
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
