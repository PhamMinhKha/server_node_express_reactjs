const bcrypt = require('bcrypt');
const usersModel = require('./../models/usersModel');

exports.login = (req, res) =>{
    res.render('index');
}
exports.xuLyLogin = (req, res) =>{
    let {txtUserName, txtPassWord} = req.body;
    let user = new usersModel();
    var infoUser = user.login(txtUserName, function(data){
        if(data)
            {
                _this.comparePassword(txtPassWord, '123', (err, match)=>{
                    if(err)
                        res.send('is ok' + err)
                    else console.log(match)
                })
            }
        else console.log('that bai')
    });
    // kiem tra mat khau user
    
    // if(user)
    // 
}
exports.cryptPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
     if (err) 
       return callback(err);
 
     bcrypt.hash(password, salt, function(err, hash) {
       return callback(err, hash);
     });
   });
 };
 
 exports.comparePassword = function(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
        return err == null ?
            callback(null, isPasswordMatch) :
            callback(err);
    });
 };
 