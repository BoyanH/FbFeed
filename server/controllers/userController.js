var User = require('mongoose').model('User');

module.exports = {
    createUser:function(req, res, next){
        var user = req.body;
        User.create(user, function(err){
            if(err){
                console.log('User couldnt be created: ' + err);
                return;
            }
            console.log("New user created");
            res.send({success: true});
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
        var updatedUser = req.body;
        User.update({_id: req.body._id}, updatedUser, function(err){
            if(err){
                console.log('Couldnt update user!');
                return;
            }
            res.end();
        })
    }
}