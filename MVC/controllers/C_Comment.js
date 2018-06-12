const fs = require('fs');
const tmpFilesModel = require('./../models/tmpFilesModel');
const C_Users = require('./C_Users');
const ffmpeg = require('fluent-ffmpeg');
const command = new ffmpeg();
const Jimp = require("jimp");
const commentsModel = require('./../models/commentsModel');
const path = require('path');

// exports.imageChange = function(req, res){
//   fs.unlink('/public/comments/', (err) => {
//     if (err) throw err;
//     console.log('path/file.txt was deleted');
//   });  
// }
exports.submitComment = function (req, res) {
    var fileName = req.body.image;
    var image = null;
    if (fileName) {
        fileName = fileName.toLowerCase();
        name = path.parse(fileName).name;
        var type = path.parse(fileName).ext;
        var video = '';
        if (type === ".mp4") {
            video = name + '.mp4';
        }
        image = {
            type,
            url: name,
            video
        }
        // di chuyển file hình sang thư mục comments
        // console.log(type);
        var oldPath = './public/tmp/' + name + '.jpg';
        var newPath = './public/comments/' + name + '.jpg';
        if (type === ".mp4") {
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
            })
            fs.rename('./public/tmp/' + name + '.mp4', './public/comments/' + name + '.mp4', function (err) {
                if (err) throw err
            })
        }
        else {
            Jimp.read("./public/tmp/" + name + type, function (err, image) {
                var w = image.bitmap.width; // the width of the image
                var h = image.bitmap.height; // the height of the image
                if (err) console.log(err);
                if (type === ".gif") {
                    fs.rename('./public/tmp/' + name + '.gif', './public/comments/' + name + '.gif', function (err) {
                        if (err) throw err
                    })
                }
                else {
                    if (w <= 500) {
                        image.scale(1) // resize
                            .quality(60) // set JPEG quality
                            .write("./public/tmp/" + name + ".jpg", function (image) {
                                fs.rename(oldPath, newPath, function (err) {
                                    if (err) throw err
                                    if (type !== ".jpg") {
                                        var filePath = './public/tmp/' + name + type;
                                        fs.unlinkSync(filePath);
                                    }
                                })
                            })
                    }
                    else {
                        image.resize(500, Jimp.AUTO) // resize
                            .quality(60) // set JPEG quality
                            .write("./public/tmp/" + name + ".jpg", function (image) {
                                fs.rename(oldPath, newPath, function (err) {
                                    if (err) throw err
                                    if (type !== ".jpg") {
                                        var filePath = './public/tmp/' + name + type;
                                        fs.unlinkSync(filePath);
                                    }
                                })
                            })
                    }
                }
            });
        }

        // kết thúc
    } else image = {
        type: null,
        url: null,
        video: null
    };

    commentsModel.create({
        commentContent: req.body.content,
        commentStatus: 1,
        commentImage: image,
        user_ObjectId: req.session.passport.user,
    }, (err, doc) => {
        if (err) return res.json({
            error: "Không thêm được bình luận"
        })
        return res.json({
            success: "Thêm thanh công"
        })
    })

}
exports.uploadFile = function (req, res, next) {
    if (!req.session.token) {
        return res.json({
            error: "F5 hoặc Đăng Nhập lại để upload ảnh"
        })
    }
    if (!req.files)
        return res.json({
            error: "Không nhận được file"
        })
    var slug = req.body.slug;
    var bytes = req.files.file.data.byteLength;
    var mb = Math.round(bytes / Math.pow(1024, 2) * 100) / 100;
    var type = req.files.file.mimetype;
    var md5 = req.files.file.md5;

    if (!req.files)
        res.json({
            error: "File này không thể upload"
        })
    if (mb > 5)
        return res.json({
            error: "Dung lượng quá 5MB"
        })
    else if (!(type === "video/mp4" || type === "image/png" || type === "image/jpeg" || type === "image/gif" || type === "image/webp"))
        return res.json({
            error: "File cho phép là mp4, png, jpg, gif, webp"
        })
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    let name = slug + '_' + Date.now();
    let fileName = name + '_' + sampleFile.name;
    let nameImage = path.parse(fileName).name;
    let fileSave = './public/tmp/' + fileName;
    sampleFile.mv(fileSave, function (err) {
        if (err)
            return res.json({
                error: err
            })
        else {
            if (type === "video/mp4") {
                var proc = new ffmpeg(fileSave)
                    .takeScreenshots({
                        filename: nameImage + '.png',
                        count: 1,
                        timemarks: ['1'] // number of seconds
                    }, './public/tmp/', function (err) {
                        console.log('screenshots were saved')
                    }).on('end', function () {
                        Jimp.read("./public/tmp/" + nameImage + '.png', function (err, lenna) {
                            if (err) console.log(err);
                            lenna.scale(1) // resize
                                .quality(60) // set JPEG quality
                                .write("./public/tmp/" + nameImage + ".jpg"); // save
                            if (type !== ".jpg") {
                                var filePath = './public/tmp/' + nameImage + '.png';
                                fs.unlinkSync(filePath);
                            }
                        });
                    });
            }
            C_Users.checkLogin(req, res, (err, doc) => {
                if (err) {
                    tmpFilesModel.create({
                        fileName,
                        fileSize: mb,
                        fileType: type,
                        fileMD5: md5,
                        fileFolder: 'comments',
                        user_ObjectId: doc.data._id
                    }, (err, doc) => {
                        return res.json({
                            success: fileName
                        })
                    })
                }
            })
        }
    });
}