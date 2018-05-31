const mongoose = require('mongoose');

var Schema = mongoose.Schema({
    ten: String,
    ten_dang_nhap: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    mat_khau: String,
    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    ngay_sinh: Number,
    gioi_tinh: Number, //1 la nam, 2 la nu, 3 chuyen gioi, 4 an
    anh_dai_dien: String,
    quyen_hang: {type: Number, default: 3}, //1 admin, 2 mod, 3 nguoi su dung
    dang_nhap_lan_cuoi: Number,
    ip_dang_nhap_lan_cuoi: String,
    mang_xa_hoi: {
        type: JSON
    },
    trang_thai_tai_khoan: Number //0 chua kich hoat, 1 da kich hoat, 2 dan bi ban
})
module.exports = mongoose.model('users', Schema);