const PostsModel = require('./../models/postsModel');
const config = require('./../../config/config');
exports.HotPage = function(req, res) {
        res.render('index.ejs');
};
exports.loadMore = function(req, res) {
    var trang = req.params.trang;
    var limit = config.limit;
    var skip =  (trang - 1) * limit;
    var tempArray = [];
    PostsModel.find({},null ,{skip, limit}, (err, data) => {
        if(err)
        {
            res.json({'error': 'Không kết nối được máy chủ! F5 thử lại'})
        }
        else{
            var data = ({trang: parseInt(trang) + 1, posts: data})
            res.json(data);
        }
    })
};
exports.HotPageLogin = function(req, res) {
    res.send(req.body);
};