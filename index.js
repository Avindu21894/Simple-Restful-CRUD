const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect("mongodb+srv://apayagalagegr52017:PQNLw3mqvtY8u4Y1@cluster0.z0oz6.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to Mongodb Database");
}).catch(()=>{
    console.error();
});

app.listen(3000, () => {
    console.log('Server listening on port: 3000' );
});

app.get('/', (req, res) => {
    res.send("Welcome Again");
});