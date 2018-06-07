const request = require('request');
const cheerio = require('cheerio');
const post = require('./../models/postsModel');
const saveFile = require('./../utilities/saveFile');
const randomstring = require("randomstring");

checkSlug = (slug) =>
{
    return new Promise(function(resolve, reject) {
    post.count({slug}, async (err, doc) =>{
        resolve(doc)
    })
})
}
exports.luuAnh = async function (req, res) {

    var check = await saveFile(req.body.folder+'_'+req.body.id, req.body.folder, req.body.image.url);
    var check_video = null;
    if(check && req.body.video !==  null)
    {
        console.log(check);
        req.body.image.url = check;
        var check_video = await saveFile(req.body.folder+'_'+req.body.id, req.body.folder, req.body.video.url);
        if(check_video)
        req.body.video.url = check_video;
    }
    else  req.body.image.url = check;
    var slug = randomstring.generate(7);
    while(await checkSlug(slug)>0)
    {
        slug = randomstring.generate(7);
    }
    var newpost = post.create({
        sourceUrl: req.body.sourceUrl,
        titles: {
            orgin: req.body.title,
            vn: req.body.newTitle,
        },
        sourceDomain: req.body.sourceDomain,
        images: {image: req.body.image, video : req.body.video},
        nsfw: req.body.nsfw,
        slug,
        upVote: req.body.upVote,
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