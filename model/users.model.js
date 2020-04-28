var mongoose= require('mongoose');
var users = new mongoose.Schema({
    fullname: {
        type: String
    },
    age: {
        type: Number
    },
    email:{
        type: String
    },
    phone: {
        type: String
    },
    country:{
        type:String
    },
    image:{
        type: String
    }
});

var Users = mongoose.model('Users', users, 'users');
module.exports=Users;