var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
exports.Index = function(req, res) {
        res.render('index.ejs');
};
exports.loadMore = function(req, res){
    var trang = req.params.id;
    request('http://haivn.com/post/hot?page='+trang+'&type=hot&haiivl=angular.callbacks._1', function (error, response, body) {
        const regex = /({.*)\);/gm; 
            let m;

    while ((m = regex.exec(body)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            body = match;
        });
    }
        const json = JSON.parse(body);
        // fs.writeFile('message.txt', console.log(json), (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        //   });
        const $ = cheerio.load(json.d);
        var tempData = [];
        $('.badge-entry-container').each(function(i, elem) {
            const tt = cheerio.load(elem);
            let img = tt('img');
            let sourceUrl = tt('a', '.badge-item-title');
            tempData.push({ 
                title: img.attr('alt'),
                src: img.attr('src'),
                sourceUrl: 'http://haivn.com'+sourceUrl.attr('href'),
                id: $(this).attr('id')
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
    
    request('http://haivn.com/post/hot?page=1&type=hot&haiivl=angular.callbacks._1', function (error, response, body) {
        const regex = /({.*)\);/gm; 
            let m;

    while ((m = regex.exec(body)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            body = match;
        });
    }
        const json = JSON.parse(body);
        // fs.writeFile('message.txt', console.log(json), (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        //   });
        const $ = cheerio.load(json.d);
        var tempData = [];
        $('.badge-entry-container').each(function(i, elem) {
            const tt = cheerio.load(elem);
            let img = tt('img');
            let sourceUrl = tt('a', '.badge-item-title');
            tempData.push({ 
                title: img.attr('alt'),
                src: img.attr('src'),
                sourceUrl: 'http://haivn.com'+sourceUrl.attr('href'),
                id: $(this).attr('id')
            });
          });
        var data = {
            trang: 2,
            posts: tempData
        }
        res.json(data);
    });
};