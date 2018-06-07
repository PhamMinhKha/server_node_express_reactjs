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
            user_ObjectId: { type: mongoose.Schema.Types.ObjectId, default: "5b0fba657ae4f53f8cf82a91" },
            upVote: {type: Number, default: 0},
            downVote: {type: Number, default: 0},
            sourceDomain: {type: String},
            slug: {type: String, unique: true},
            status: { type: String, default: 'New'} // Hot, Trend, New
        })
   
module.exports = mongoose.model('posts', Schema);