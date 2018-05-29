const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            ten: String,
            ten_dang_nhap: String,
            mat_khau: String,
            ngay_sinh: Number,
            gioi_tinh: Number, //1 la nam, 2 la nu, 3 chuyen gioi, 4 an
            anh_dai_dien: String,
            quyen_hang: Number, //1 admin, 2 mod, 3 nguoi su dung
            dang_nhap_lan_cuoi: Number,
            ip_dang_nhap_lan_cuoi: String,
            ket_noi_facebook: String,
            ket_noi_google: String,
            trang_thai_tai_khoan: Number //0 chua kich hoat, 1 da kich hoat, 2 dan bi ban
        })

module.exports = mongoose.model('users', Schema);