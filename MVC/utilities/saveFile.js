var http = require('https');
var fs = require('fs');

const saveFile =  (filename = String, folder = String ,url = String) =>
{
  return new Promise((thanhCong, thatBai)=>{
    var file = fs.createWriteStream('public/images/'+filename+'.jpg');
    var request = http.get(url, function(response) {
       response.pipe(file);
         file.on('finish', function(){
          thanhCong('public/images/'+folder + '/'+ filename)
       })
    });
  })
}
module.exports = saveFile;