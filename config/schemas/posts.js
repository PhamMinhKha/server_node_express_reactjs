const mongodb = require('mongoose');
const config = require('./../config');
mongodb.connect(config.connectdb);

const Schema = mongodb.Schema({
    id_post: Number,
    ten_post: String,
    hinh_net: String,
    hinh_thuong: String,
    nguon: String,
    thoi_gian_dang: Number,
    tag: String,
    id_nguoi_dang: Number,
})

const document = mongodb.model('posts', Schema);
document.create([]);
module.exports = Schema;