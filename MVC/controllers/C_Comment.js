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
  var name = req.body.image;
  var image = null;
  if (name) {
    name = path.parse(name).name;
    var type = path.parse(name).ext;
    var video = '';
    if (type === "mp4") {
      video = name + '.mp4';
    }
    image = {
      type,
      url: name,
      video
    }
  } else image = {
    type: null,
    url: null,
    video: null
  };
  commentsModel.create({
    commentContent: req.body.content,
    commentStatus: 1,
    commentImage: image,
    user_ObjectId: req.body._id,
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
            filename: name + '.png',
            count: 1,
            timemarks: ['1'] // number of seconds
          }, './public/tmp/', function (err) {
            console.log('screenshots were saved')
          }).on('end', function () {
            Jimp.read("./public/tmp/" + name + '.png', function (err, lenna) {
              if (err) console.log(err);
              lenna.scale(1) // resize
                .quality(60) // set JPEG quality
                .write("./public/tmp/" + name + ".jpg"); // save
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