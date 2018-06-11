const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            commentContent : {type: String, maxlength: 1000},
            commentStatus: Number, // 1 is ok, 2 is ban
            commentImage: JSON,
            commentUpVote: {type: Number, default: 0},
            commentDownVote: {type: Number, default: 0},
            user_ObjectId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
            commentCreate: {type: Date, default: Date.now},
            commentModify: {type: Date, default: Date.now}
        })
   
module.exports = mongoose.model('comments', Schema);