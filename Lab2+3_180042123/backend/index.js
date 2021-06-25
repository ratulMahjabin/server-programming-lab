const express = require('express');
const app = express();
const port = 2123;


app.get('/', (req, res) => {
    res.send("<H1> Home page </H1>");
});
app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
