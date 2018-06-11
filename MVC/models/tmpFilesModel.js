const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            fileName : String,
            fileSize: String,
            fileType: String,
            fileMD5: String,
            fileFolder: String,
            user_ObjectId: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
            fiteUploadTime: {type: Date, default: Date.now}
        })
   
module.exports = mongoose.model('tmpFiles', Schema);