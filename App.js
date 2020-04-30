//import npm
require('dotenv').config();
let UserRouter = require('./route/users.route');
let bodyParser = require('body-parser');

//init neccessary npm
let express= require('express');
let app= express();

//bodyParser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//connect mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sang-company', {useNewUrlParser: true});

//render
app.use('/users', UserRouter);

//server_port
let port= process.env.SERVER_PORT;
app.listen(port, console.log("Server is listening on port "+port));

