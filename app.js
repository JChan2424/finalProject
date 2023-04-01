const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const connection = require('./db/connection.js');
const server = app.listen(process.env.PORT || 8080, ()=>console.log("Listening"));

app.use(express.static("public"));