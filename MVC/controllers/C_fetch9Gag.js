

exports.Index = function(req, res) {

        res.render('index.ejs');
};
exports.HotPageLogin = function(req, res) {
    res.send(req.body);
};