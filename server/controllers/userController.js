var User = require('mongoose').model('User');

module.exports = {
    createUser:function(req, res, next){
        var newUser = req.body;
        console.log("newUser==");
        console.log(newUser);
        User.create(newUser, function(err, user){
            if(err){
                console.log('User couldnt be created: ' + err);
                return;
            }
            req.logIn(user, function(err){
                if(err){
                    console.log('Couldnt login user in server in userController: ' + err);
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                console.log('User logged in through createUser');
                res.send(user);
            });
        });
    },
    getUserById: function(req, res, next){
        var id = req.body.id;
        User.findOne({id:id}).exec(function(err, user){
            if(err){
                console.log('User doesnt exists in the database');
                res.send({exists:false});
                return;
            }
            console.log('User exists');
            res.send({exists:true, user:user});
        });
    },
    updateUser: function(req, res, next){
        var updatedUser = {};
            updatedUser.username = req.body.username;
            updatedUser.password = req.body.password;
            updatedUser.likes = req.body.likes;

        User.update({_id: req.body._id}, updatedUser, function(err){
            if(err){
                console.log('Couldnt update user!' + err);
                return;
            }
            res.end();
        })
    }
}