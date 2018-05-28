var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var passport = require('passport'),
  Strategy = require('passport-local').Strategy;

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

// Require controller modules.
const HotPage = require('./MVC/controllers/C_HotPage');
const Users = require('./MVC/controllers/C_Users');
const New = require('./MVC/controllers/C_NewPage');
const fetch9Gag = require('./MVC/controllers/C_fetch9Gag');
const dbuser = require('./MVC/models/usersModel');
// var book_controller = require('../controllers/bookController');
// var author_controller = require('../controllers/authorController');
// var genre_controller = require('../controllers/genreController');
// var book_instance_controller = require('../controllers/bookinstanceController');

router.get('/', HotPage.HotPage);
router.route('/login').get(Users.login)
// .post(passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/ok'
// }), Users.login);
router.route('/login').post(passport.authenticate('local', {
  successRedirect: '/ok',
  failureRedirect: '/fuck'
}));
router.route('/dangnhap').get(Users.test);
router.route('/dangnhap').post(passport.authenticate('local', {
  successRedirect: '/ok',
  failureRedirect: '/fuck'
}));
// router.route('/ok').get((req, res)=>{
//     console.log(req.isAuthenticated());
//     if(!req.isAuthenticated())
//     res.send('chua dang nhap');
//     else res.send('da dang nhap');
// })
router.get('/ok', ensureAuthenticated, (req, res) => {
  console.log(req.session);

  res.send('ok')
})
// router.route('/login').get(Users.login).post(jsonParser, Users.xuLyLogin);
router.route('/checklogin').post(jsonParser, Users.checkLogin);
router.route('/New').get(New.Index).post(New.Index);
router.route('/LuuAnh').post(jsonParser, New.luuAnh);
router.route('/fetch9Gag').get(fetch9Gag.Index).post(jsonParser, fetch9Gag.HotPageLogin);
const user = {
  username: 'test-user',
  passwordHash: 'bcrypt-hashed-password',
  id: 1
}
passport.use(new Strategy(
  function (txtUserName, txtPassWord, done) {
    console.log(txtUserName);
    dbuser.findOne({
      ten_dang_nhap: txtUserName
    }, function (err, user) {
      console.log(txtUserName)
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('da vao day');
        return done(null, false, {
          message: 'Incorrect username.'
        });
      } else {
        return done(null, user)
        console.log('da vao day');
      }

    });
  }
));
passport.serializeUser((user, done) => {
  console.log(user.ten_dang_nhap)
  done(null, user.ten_dang_nhap);
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
passport.deserializeUser(function (user, done) {
  console.log('thanh cong');
  dbuser.findOne({
    ten_dang_nhap: user
  }, function (err, user) {
    console.log('thanh cong');
    done(err, user);
  });
});
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