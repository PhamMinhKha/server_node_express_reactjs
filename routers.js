var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Require controller modules.
const HotPage = require('./MVC/controllers/C_HotPage');
const Users = require('./MVC/controllers/C_Users');
const New = require('./MVC/controllers/C_NewPage');
const fetch9Gag = require('./MVC/controllers/C_fetch9Gag');
// var book_controller = require('../controllers/bookController');
// var author_controller = require('../controllers/authorController');
// var genre_controller = require('../controllers/genreController');
// var book_instance_controller = require('../controllers/bookinstanceController');

router.get('/', HotPage.HotPage);
router.route('/login').get(Users.login).post(jsonParser, Users.xuLyLogin);
router.route('/checklogin').post(jsonParser, Users.checkLogin);
router.route('/New').get(New.Index).post(New.Index);
router.route('/LuuAnh').post(jsonParser, New.luuAnh);
router.route('/fetch9Gag').get(fetch9Gag.Index).post(jsonParser, fetch9Gag.HotPageLogin);
// server.get('/', (req, res)=>{
//     res.render('index.ejs')
// })
// router.get('/*', HotPage.index);
// server.post('/login', urlencodedParser, (req, res) =>{
//     if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.txtUserName)
//   req.session.user = 'fucking cat';
//   console.log(req.session)
//   var token = jwt.sign({ foo: 'Minh kha' }, 'shhhhh');
//   console.log(token)
//   var decoded = jwt.verify(token, 'shhhhh');
//     console.log(decoded.foo) // bar
// })
module.exports = router;