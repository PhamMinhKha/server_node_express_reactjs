const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            title : JSON,
            img : String
        })
   
module.exports = mongoose.model('posts', Schema);