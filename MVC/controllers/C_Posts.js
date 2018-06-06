const request = require('request');
const cheerio = require('cheerio');
const post = require('./../models/postsModel');
const saveFile = require('./../utilities/saveFile');

exports.luuAnh = async function (req, res) {

    var check = await saveFile('9gag_'+req.body.id, '9Gag', req.body.image.url);
    var check_video = null;
    if(check && req.body.video !==  null)
    {
        req.body.image.url = check;
        var check_video = await saveFile('9gag_'+req.body.id, '9Gag', req.body.video.url);
        if(check_video)
        req.body.video.url = check_video;
    }
    console.log(req.body.title);
    var newpost = post.create({
        sourceUrl: req.body.sourceUrl,
        titles: {
            orgin: req.body.title,
            vn: req.body.newTitle,
        },
        images: {image: req.body.image, video : req.body.video},
        nsfw: req.body.nsfw,
        upVote: req.body.upvote,
        status: req.body.status
    }, (err, data) => {
        if(err){
        if(err.code === 11000)
        {
            res.json({error: 'Hình đã được thêm từ trước'});
        }
        else res.json({error: err.errmsg})
    }
    else {
        res.json(data);
    }
    });
}