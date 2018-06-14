const bcrypt = require('bcrypt');
const mongodb = require('./../models/basicModel');
const usersModel = require('./../models/usersModel');
const jwt = require('jsonwebtoken');
const saveFile = require('./../utilities/saveFile');
const config = require('./../../config/config');
var passport = require('passport');

exports.login = (req, res) => {
    res.render('index');
}
let CM_xuLyLogin = (txtUserName) => {
    return new Promise((ThanhCong, ThatBai) => {
        usersModel.findOne({
            ten_dang_nhap: txtUserName
        }, function (err, user) {
            if (user)
                ThanhCong(user)
            else ThatBai(new Error('Không tồn tại _nguoi_dung này'))
        })
    })
}
exports.checkLogin = (req, res, callback) => {
    var token = req.body.token;
    if (req.session.token || token) {
        if (!req.session.token) {
            req.session.token = token;
        }
        jwt.verify(req.session.token, config.secret, function (err, decoded) {
            if (err) {
                return callback(false, null);
            } else {
                return callback(true, decoded);
            }
        });

    } else
        return callback(false, null);
}
exports.checkLoginAxios = (req, res, callback) => {
    var token = req.body.token;
    if (req.session.token || token) {
        if (!req.session.token) {
            req.session.token = token;
        } else token = req.session.token;
        jwt.verify(req.session.token, config.secret, function (err, decoded) {
            if (err) {
                return res.send(false);
            } else {
                decoded = decoded.data;
                // console.log(req.session)
                return res.json({
                    ten: decoded.ten,
                    quyen_hang: decoded.quyen_hang,
                    _id: decoded._id,
                    avatar:decoded.anh_dai_dien,
                    token: token
                })
            }
        });
    } else
        return res.send(false);
}
exports.xuLyLogin = async (req, res) => {
    let {
        txtUserName,
        txtPassWord
    } = req.body;
    let userPromise = CM_xuLyLogin(txtUserName);
    var user = await userPromise.then((userInfo) => {
        return userInfo;
    }, err => {
        res.send(false)
    });
    if (user)
        this.comparePassword(txtPassWord, user.mat_khau, (err, match) => {
            if (err)
                res.send(err)
            else {
                if (match === true) {
                    user.mat_khau = '';
                    let token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 15),
                        // exp: Math.floor(Date.now() / 1000) + (10),
                        data: user
                    }, 'a7612khASFSD');
                    req.session.token = token;
                    res.send(match)
                } else {
                    token
                    res.send(match)
                }


            }
        })

}
exports.token = function (user) {
    user.mat_khau = 'chắc dễ ăn lắm kaka';
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 15),
        // exp: Math.floor(Date.now() / 1000) + (10),
        data: user
    }, config.secret);
    return token;
}
exports.cryptPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return callback(err);

        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
};
exports.tao_mat_khau = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
                reject(err);

            bcrypt.hash(password, salt, function (err, hash) {
                resolve(hash);
            });
        });
    })
}
exports.comparePassword = function (plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};
exports.test = (req, res) => {
    res.send(
        `
        <form method="post" action="/dangnhap">
        <input type="text" name="username"/>
        <input type="text" name="password"/>
        <button>submit</button>
        </form>`
    );
}
exports.logOut = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
exports.findOrCreate = async (profile, callback) => {
    await usersModel.findOne({
        email: profile.emails[0].value
    }, async (err, data) => {
        if (err)
            return callback(err)
        else {
            if (data === null) // toa user moi
            {
                console.log('create')
                var mat_khau = await this.tao_mat_khau(Date.now() + config.secret).then((hash) => {
                    return hash;
                });
                var anh = await saveFile(profile.id, 'avatar', profile.photos[0].value);
                var user = usersModel.create({
                    ten_dang_nhap: profile.id,
                    mat_khau: mat_khau,
                    email: profile.emails[0].value,
                    anh_dai_dien: anh,
                    ten: profile.displayName,
                    mang_xa_hoi: {
                        facebook: [{
                            id: profile.id
                        }]
                    }
                }, async (err, doc) => {
                    if (err)
                        throw err;
                    else {
                        var _token = this.token(doc);
                        doc.token = _token;
                        return callback(null, doc)
                    }
                })
            } else { //tra user co trong database
                var _token = this.token(data);
                data.token = _token;
                return callback(null, data)
            }
        }
    })
    return (true);
}