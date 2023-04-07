const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const connection = require('./db/connection.js');
const router = require("./routes/index.js");
connection
.then(()=>{
    console.log("Connected");
    const server = app.listen(process.env.PORT || 8080, ()=>console.log("Server started"));
})

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"));
app.use('/api/v1', router)