const PostModel = require('./../models/postsModel');

exports.Index = function(req, res){
    res.render('index');
}
exports.View = function(req, res){
    PostModel.findOne({slug: req.params.slug}, (err, doc)=>{
        if(err)
        {
            res.json({error: "Không tìm thấy ảnh này"})
        }
        else {
            res.json(doc);
        }
    })
}