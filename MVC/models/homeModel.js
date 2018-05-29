const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            id_post : String,
            thoiGianDuocLenTrangChu: String,
            
        })
   
module.exports = mongoose.model('posts', Schema);