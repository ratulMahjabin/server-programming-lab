const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes.routes");

app.use(userRoutes);
module.exports = app;