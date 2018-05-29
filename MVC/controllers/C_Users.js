const bcrypt = require('bcrypt');
const mongodb = require('./../models/basicModel');
const usersModel = require('./../models/usersModel');
const jwt = require('jsonwebtoken');


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
exports.checkLogin = (req, res) => {
    if(req.session.token)
    {
        jwt.verify(req.session.token, 'a7612khASFSD', function(err, decoded) {
            if (err) {
                res.send(false)
            }
            else res.send(true);
          });
        
    }
    else res.send(false);
}
exports.xuLyLogin = async (req, res) => {
    let {
        txtUserName,
        txtPassWord
    } = req.body;
    let userPromise = CM_xuLyLogin(txtUserName);
    var user = await userPromise.then((userInfo) => {
        return userInfo;
    }, err => { res.send(false)});
    if(user)
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
            }
            else {token
                res.send(match)
            }
            

        }
    })

}
exports.token = function(user){
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 15),
        // exp: Math.floor(Date.now() / 1000) + (10),
        data: user
    }, 'a7612khASFSD');
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

exports.comparePassword = function (plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
};
exports.test = (req, res) =>{
    res.send(
        `
        <form method="post" action="/dangnhap">
        <input type="text" name="username"/>
        <input type="text" name="password"/>
        <button>submit</button>
        </form>`
    );
}