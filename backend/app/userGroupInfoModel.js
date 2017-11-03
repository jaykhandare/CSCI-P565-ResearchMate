var mongoose = require('mongoose');

var userGroupSchema = mongoose.Schema({
    userID:{
        type:Number
    },
    groupID:{
        type: Number
    }
});

module.exports = mongoose.model('userGroupInfo', userGroupSchema);