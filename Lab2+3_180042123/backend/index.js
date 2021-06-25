require("dotenv").config();
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT;
const connection_url = process.env.Database_token;

mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Mongodb connected and Server running on port: ${port}`)))
    .catch((error) => console.log(error.message));
