const permissions = require('./permissions');
const basicModel = require('./basicModel');
const users = require('./users');
const posts = require('./posts');
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);

const schema = function(){
    var time =Math.floor(Date.now() / 1000);
    const user = new users('Minh Kha', 'admin', 'matkhau', time, 1, 'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/23795472_1452172751548666_956889269825464283_n.jpg?_nc_cat=0&oh=f80d560c6ac551c093d4b5a0807fa7d1&oe=5B825558', 1, time, '192.168.1.1', '', '');
    user.insert();
    // const user = new users();

}

module.exports = schema;