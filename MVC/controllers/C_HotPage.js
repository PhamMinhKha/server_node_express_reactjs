

exports.HotPage = function(req, res) {
    console.log('====================================');
    console.log(req.session);
    console.log('====================================');
    console.log('Cookies: ', req.cookies);
        res.render('index.ejs');
};
exports.HotPageLogin = function(req, res) {
    res.send(req.body);
};