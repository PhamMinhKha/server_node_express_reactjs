var request = require('request');
var cheerio = require('cheerio');

exports.Index = function(req, res) {
        res.render('index.ejs');
};
exports.fetchPosts = function(req, res) {
    console.log(req.body);
    var last_post_id = '';
    request('https://9gag.com/', function (error, response, body) {
        const $ = cheerio.load(body);
        $('#jsid-latest-entries').each(function(i, elem) {
            let id_post = $(this).text();
            var tam = id_post.split(",");
            last_post_id = tam[0];
          });
    });
    //SAU KHI CO DUOC ID MOI CHUNG TA LAY DU LIEU
    request('https://9gag.com/v1/group-posts/group/default/type/hot?after='+last_post_id+'&c=10', function (error, response, body) {
        var data = JSON.parse(body);
        // console.log(data.data.posts[0].images.images460.url);
        res.json(data.data.posts);
    });
};