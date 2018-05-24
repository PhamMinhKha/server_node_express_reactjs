const mongodb = require('mongoose');
const config = require('./../config');
mongodb.connect(config.connectdb);

class users {
    constructor(ten = String, ten_dang_nhap = String, mat_khau = String, ngay_sinh = Number, gioi_tinh = Number,
        anh_dai_dien = String, quyen_hang = Number, dang_nhap_lan_cuoi = Number, ip_dang_nhap_lan_cuoi = String,
        ket_noi_facebook = String, ket_noi_google = String) {
        this.ten = ten;
        this.ten_dang_nhap = ten_dang_nhap;
        this.mat_khau = mat_khau;
        this.ngay_sinh = ngay_sinh;
        this.gioi_tinh = gioi_tinh;
        this.anh_dai_dien = anh_dai_dien;
        this.quyen_hang = quyen_hang;
        this.dang_nhap_lan_cuoi = dang_nhap_lan_cuoi;
        this.ip_dang_nhap_lan_cuoi = ip_dang_nhap_lan_cuoi;
        this.ket_noi_facebook = ket_noi_facebook;
        this.ket_noi_google = ket_noi_google;

        const Schema = mongodb.Schema({
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
        this.document = mongodb.model('users', Schema);
    }
    insert() {
        this.document.create({
           ...this
        });
    }
    remove(id = Number /*id nguoi dung*/) {
        this.document.remove({
            _id: id
        });
    }
    update(id, data = JSON) {
        this.document.update({
            id_quyen: id_quyen
        }, data, null, (err, data) => {
            console.log(data);
        })
    }
}

// users.create({
//     ten: 'Pham Minh Kha',
//     ngay_sinh: 3182973,
//     gioi_tinh: 1, //1 la nam, 2 la nu, 3 chuyen gioi, 4 an
//     anh_dai_dien: 'http://anhdaidien.com',
//     quyen_hang: 1, //1 admin, 2 mod, 3 nguoi su dung
//     dang_nhap_lan_cuoi: '12387192',
//     ip_dang_nhap_lan_cuoi: '1.1.1.1',
//     ket_noi_facebook: 'chua ket noi',
//     ket_noi_google: 'chua ket noi',
//     trang_thai_tai_khoan: 1
// })

module.exports = users;