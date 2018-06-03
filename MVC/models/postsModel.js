const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            titles : JSON,// {titleVN, titleEN}
            images : JSON,//{image460 {height, width, urlGoc, urlCDN} video {height, width, urlGoc, hasAudio, duration} }
            type: String, //Video or image
            nsfw: { type: Number, default: 0}, // 0 is safe for work and 1 is not safe for work
            sourceUrl: { type: String, default: "",  unique: true},
            tags:JSON, // {tagsVN, tagsEN}
            categorys: JSON,
            dateCreate: { type: Date, default: Date.now },
            dateModify: { type: Date, default: Date.now },
            user_ObjectId: { type: Number },
            status: { type: Number, default: 'New'} // Hot, Trend, New
        })
   
module.exports = mongoose.model('posts', Schema);