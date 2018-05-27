var http = require('https');
var fs = require('fs');

const saveFile = (filename = String, url = String) =>
{
    var file = fs.createWriteStream('public/images/'+filename);
    var request = http.get(url, function(response) {
      response.pipe(file);
    });
}
module.exports = saveFile;