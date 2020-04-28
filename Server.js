require('dotenv').config();
let express= require('express');

let app= express();



let port= process.env.SERVER_PORT;
app.listen(port, console.log("Server is listening on port "+port));

