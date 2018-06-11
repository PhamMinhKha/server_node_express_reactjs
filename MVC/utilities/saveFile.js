var https = require('https');
var http = require('http');
var fs = require('fs');


function getFileExtension(filename){
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}


const saveFile = (filename = String, folder = String, url = String) => {
  var ext = getFileExtension(url);
  return new Promise((thanhCong, thatBai) => {
    var file = fs.createWriteStream('public/images/' + folder + '/' + filename + '.' + ext);
    var n = url.indexOf("https");
    if (n === -1) {
      var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
          thanhCong('images/' + folder + '/' + filename + '.' + ext)
        })
      });
    } else {
      var request = https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
          thanhCong('images/' + folder + '/' + filename + '.' + ext)
        })
      });
    }
  })
}
module.exports = saveFile;

