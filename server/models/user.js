var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: String,
    likes:[{
            id: String,
            kind: String,
            points: Number
        }]
});

var user = mongoose.model('User', userSchema);