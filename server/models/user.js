var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String, // fbid of user,
    password: String,
    likes:[{
            id: String, // id of page, person
            points: Number // the points he/she/it has (one point == 1 like, share or comment)
        }]
});

var User = mongoose.model('User', userSchema);

module.exports = {
    seedUser: function(){
        User.find({}).exec(function(err, collection){
            console.log(collection);
        });
        //User.remove({}, function(err){if(!err)console.log('All users deleted');});
    }
}