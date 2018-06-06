var http = require('https');
var fs = require('fs');
function getFileExtension(filename)
{
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}
const saveFile =  (filename = String, folder = String ,url = String) =>
{
  var ext = getFileExtension(url);
  return new Promise((thanhCong, thatBai)=>{
    var file = fs.createWriteStream('public/images/'+folder +'/'+filename+'.'+ext);
    var request = http.get(url, function(response) {
       response.pipe(file);
         file.on('finish', function(){
          thanhCong('public/images/'+folder + '/'+ filename+'.'+ext)
       })
    });
  })
}
module.exports = saveFile;