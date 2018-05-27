const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            title : String,
            img : String
        })
   
module.exports = mongoose.model('posts', Schema);