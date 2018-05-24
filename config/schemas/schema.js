const permissions = require('./permissions');
const users = require('./users');
const posts = require('./posts');
const schema = function(){
    var time =Math.floor(Date.now() / 1000);
    // const user = new users('Minh Kha', 'admin', 'matkhau', time, 1, 'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/23795472_1452172751548666_956889269825464283_n.jpg?_nc_cat=0&oh=f80d560c6ac551c093d4b5a0807fa7d1&oe=5B825558', 1, time, '192.168.1.1', '', '');
    // user.insert();
    const user = new users();
    // user.remove("5b06cd7ca5a8403e20b436ba");
    user.document.findById('5b06cd7ca5a8403e20b436ba',(err, res) =>{
        console.log(res);
    });
    user.document.remove({_id : "5b06cd7ca5a8403e20b436ba"});
}

module.exports = schema;