var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
exports.Index = function(req, res) {
        res.render('index.ejs');
};
exports.loadMore = function(req, res){
    var trang = req.params.id;
    request('http://xem.vn/photos/more?sort=new&page='+trang, function (error, response, body) {
        var tempData = [];
        const $ = cheerio.load(body);
        $('.photoListItem').each(function(i, elem) {
            const tt = cheerio.load(elem);
            let img = tt('img');
            let sourceUrl = tt('a', '.thumbnail');
            tempData.push({ 
                title: img.attr('alt'),
                src: img.attr('src'),
                sourceUrl: 'http://haivn.com'+sourceUrl.attr('href'),
                id: $(this).attr('data-id')
            });
          });
          trang = parseInt(trang) + 1 ;
        var data = {
            trang: trang,
            posts: tempData
        }
        res.json(data);
    });
}
exports.fetchPosts = async function(req, res) {
    var last_post_id = '';
    
    request('http://xem.vn/photos/more?sort=new&page=1', function (error, response, body) {
        var tempData = [];
        const $ = cheerio.load(body);
        $('.photoListItem').each(function(i, elem) {
            const tt = cheerio.load(elem);
            let img = tt('img');
            let sourceUrl = tt('a', '.thumbnail');
            tempData.push({ 
                title: img.attr('alt'),
                src: img.attr('src'),
                sourceUrl: 'http://xemvn.com/'+sourceUrl.attr('href'),
                id: $(this).attr('data-id')
            });
          });
        var data = {
            trang: 2,
            posts: tempData
        }
        res.json(data);
    });
};