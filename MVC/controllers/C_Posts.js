const request = require('request');
const cheerio = require('cheerio');
const post = require('./../models/postsModel');
const saveFile = require('./../utilities/saveFile');

exports.luuAnh = function(req, res) {
    console.log(req.body)
    res.send('ok');
    // post.create({title: {orgin: req.body.title ,vn: req.body.newTitle}, img: req.body.img}, (err, data) => {
    //     console.log(data);
    //     let test = saveFile('kenze.jpg', req.body.img);
    //     console.log(test);
    //     res.send(data);
    // });
    
}