//import npm
let express= require('express');

//init npm object
let router= express.Router();

//import model
var Users= require('../model/users.model');

//get all users
router.route('/').get((req, res)=>{
    Users.find()
    .sort({fullname: 'asc'})
    .then(users=>{
        res.json({users});
    })
})
//insert user
router.route('/insert').post(function(req,res){
    let user = new Users(req.body);
    user.save()
    .then(item=>{
        res.status(200).json(`\"${item.fullname}\" is added successfully`);
    })
    .catch(err => {
        res.status(404).send("unable to add user to database");
    });
})

//find user by id
router.route('/:idUser').get((req, res)=>{
    var {idUser}=req.params;
    Users.findById({_id:idUser}, (err, user)=>{
        if (!user){
            res.status(404).send("data is not found");
        }
        else{
            res.json({user});
        }
    })
})

//delete user by id
router.route('/delete/:idUser').get((req, res)=>{
    var {idUser}=req.params;
    Users.findByIdAndRemove({_id:idUser}, (err, user)=>{
        if (err){
            res.status(404).send(err);
        }
        else{
            res.status(200).send(`\"${user.fullname}\" is deleted!`);
        }
    })
})

//update user by id
router.route('/update').post((req, res)=>{
    var idUser=req.body._id;
    Users.findById({_id: idUser}, (err, user)=>{
        if (err){
            res.status(404).send("data is not found");
        }
        else{
            user.fullname= req.body.fullname;
            user.age= req.body.age;
            user.email= req.body.email;
            user.phone= req.body.phone;
            user.country= req.body.country;
            user.image= req.body.image;
            user.save()
            .then(user=>{
                res.status(200).send(`\"${user.fullname}\" is updated successfully`);
            })
            .catch(err=>{
                res.status(400).send("Update fail!");
            })
        }
    })
})

module.exports=router;