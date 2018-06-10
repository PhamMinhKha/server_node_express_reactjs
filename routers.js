var express = require('express');
const server = express();
var router = express.Router();
const bodyParser = require('body-parser');
var passport = require('passport'),
  Strategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;


// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: true
});
// server.use(fileUpload());
// Require controller modules.
const HotPage = require('./MVC/controllers/C_HotPage');
const Users = require('./MVC/controllers/C_Users');
const New = require('./MVC/controllers/C_NewPage');
const C_ViewPage = require('./MVC/controllers/C_ViewPage');
const C_Category = require('./MVC/controllers/C_Category');
const fetch9Gag = require('./MVC/controllers/C_fetch9Gag');
const fetchXemVN = require('./MVC/controllers/C_fetchXemVN');
const fetchHaiVN = require('./MVC/controllers/C_fetchHaiVN');
const C_Comment = require('./MVC/controllers/C_Comment');
const dbuser = require('./MVC/models/usersModel');
const C_Posts = require('./MVC/controllers/C_Posts');
// var book_controller = require('../controllers/bookController');
// var author_controller = require('../controllers/authorController');
// var genre_controller = require('../controllers/genreController');
// var book_instance_controller = require('../controllers/bookinstanceController');
// Khach truy cap
router.get('/', HotPage.HotPage);
router.get('/loadCategories', C_Category.loadCategory);
router.route('/login').get(Users.login);
router.get('/auth/facebook', passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['email'],
  profile: ['photos', 'gender', 'profileUrl', 'displayName', 'username']
}));
router.get('/auth/facebook/callback',function(req, res, next){
  passport.authenticate('facebook', function(err, user, info){
      if(err){
      return next(err);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      } else {
        req.session.token = info.token;
        return res.redirect('/');
      }
    });
  })(req, res, next);
}
 );
 router.route('/v/:slug').get(C_ViewPage.Index);
 router.route('/view/:slug').get(C_ViewPage.View);
 router.post('/upload/comment', C_Comment.uploadFile);
// .post(passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/ok'
// }), Users.login);
router.route('/login').post(function (req, res, next) {
  passport.authenticate('loginUsers', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        detail: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      } else {
        req.session.token = info.token;
        return res.json({
          detail: info
        });
      }
    });
  })(req, res, next);
});

router.route('/dangnhap').post(jsonParser, passport.authenticate('loginUsers', {
  // successRedirect: '/ok',
  // failureRedirect: '/fuck'
}));
// router.route('/ok').get((req, res)=>{
//     console.log(req.isAuthenticated());
//     if(!req.isAuthenticated())
//     res.send('chua dang nhap');
//     else res.send('da dang nhap');
// })
router.get('/ok', ensureAuthenticated, (req, res) => {
  // console.log(req.session);

  res.send('ok')
})
// router.route('/login').get(Users.login).post(jsonParser, Users.xuLyLogin);
router.route('/checklogin').post(jsonParser, Users.checkLoginAxios);
router.route('/New').get(New.Index).post(New.Index);
router.route('/LuuAnh').post(jsonParser, C_Posts.luuAnh);
// router.route('/fetch9Gag').get(ensureAuthenticated, requireAdmin, fetch9Gag.Index).post(jsonParser, fetch9Gag.fetchPosts);
router.route('/loadMore/:trang').get(HotPage.loadMore);
router.route('/fetch9Gag').get(fetch9Gag.Index).post(jsonParser, fetch9Gag.fetchPosts);
router.route('/fetch9Gag/loadMore/:id').get(fetch9Gag.loadMore);
router.route('/fetchHaiVN').get(fetchHaiVN.Index).post(jsonParser, fetchHaiVN.fetchPosts);
router.route('/fetchHaiVN/loadMore/:id').get(fetchHaiVN.loadMore);
router.route('/fetchXemVN').get(fetchXemVN.Index).post(jsonParser, fetchXemVN.fetchPosts);
router.route('/fetchXemVN/loadMore/:id').get(fetchXemVN.loadMore);
router.route('/logout').get((req, res, next)=>{
  req.logout();
  next();
}, Users.logOut);
// router.route('./fetch9Gag').post(jsonParser, fetch9Gag.fetchPosts);
// router.route('/fetch9Gag').get(fetch9Gag.Index).post(jsonParser, fetch9Gag.HotPageLogin);

passport.use('loginUsers', new Strategy(
  function (username, password, done) {
    dbuser.findOne({
      ten_dang_nhap: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Tài khoản này không tồn tại!'
        });
      }
      Users.comparePassword(password, user.mat_khau, (err, data) => {
        if (err) return done(null, false, {
          message: 'Mật khẩu không đúng!'
        });
        else {
          if (data)
            return done(null, user, {
              message: true,
              username: user.ten,
              quyen_hang: user.quyen_hang,
              token: Users.token(user)
            });
          else
            return done(null, false, {
              message: 'Sai Mật Khẩu'
            })
        }
      })
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.ten_dang_nhap);
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
passport.deserializeUser(function (user, done) {
  dbuser.findOne({
    ten_dang_nhap: user
  }, function (err, user) {
    done(err, user);
  });
});

function requireAdmin(req, res, next) {
  Users.checkLogin(req, res, (status, data) => {
    if (status) {
      if (data.data.quyen_hang === 1) {
        return next();
      } else res.render('404', {
        url: req.url
      });
    } else res.render('404', {
      url: req.url
    });
  })
}
passport.use('facebook', new FacebookStrategy({
    clientID: 259299504808580,
    clientSecret: '906a0245d671ed5bd73b3f92757bd789',
    callbackURL: "http://localhost:4000/auth/facebook/callback",
    enableProof: true,
    profileFields: ['id', 'email' ,'displayName' ,'photos', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
  },
  function (accessToken, refreshToken, profile, done) {
    Users.findOrCreate(profile, function (err, user) {
      if (err) {
        return done(err);
      }
      else
        return done(null, user, {
              message: true,
              username: user.ten_dang_nhap,
              permission: user.quyen_hang,
              token: Users.token(user)
        });
    });
  }
));

module.exports = router;