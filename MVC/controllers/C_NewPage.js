const request = require('request');
const cheerio = require('cheerio');
const post = require('./../models/postsModel');
const saveFile = require('./../utilities/saveFile');

exports.luuAnh = function(req, res) {
    post.create({title: {orgin: req.body.title ,vn: req.body.newTitle}, img: req.body.img}, (err, data) => {
        console.log(data);
        let test = saveFile('kenze.jpg', req.body.img);
        console.log(test);
        res.send(data);
    });
    
}
exports.Index = function (req, res) {
    // console.log(req.method)
    if(req.method === "GET"){
        res.render('index.ejs');
    }
    else {
    var request = require('request');
    var html = '';
    request('http://xem.vn/photos/more?sort=new&page=1', function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        const $ = cheerio.load(body);
        var data = [];
        $('.thumbImg', '.thumbnail').each(function(i, elem) {
            let img = $(this).attr('src');
            let title = $(this).attr('alt');
            data.push({img, title});
          });
          
       
        // console.log(data);
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        res.send(data);
    });
    }
};