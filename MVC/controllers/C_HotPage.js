

exports.HotPage = function(req, res) {
        console.log(req.session);
        res.render('index.ejs');
};
exports.HotPageLogin = function(req, res) {
    res.send(req.body);
};