const express = require('express');
const server = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const router = require('./routers');
const bodyParser = require('body-parser');
const  cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  const path = require('path');
const fs = require('fs');
  server.use(require('body-parser').urlencoded({ extended: true }));
//erver.use(cookieParser());
server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 60000 * 60 * 24 * 30 ,secure : false}
}))
server.use(fileUpload({
  limits: { fileSize: 5.5 * 1024 * 1024 },
}));  
server.use(cookieParser());
server.use(passport.initialize());
server.use(passport.session());
server.use('/', router);
// server.use('/*', router);

server.set('view engine', 'ejs');
server.set('views', './MVC/views');
server.use(express.static('./public'));
server.use(express.static(path.join(__dirname, 'public/images/9Gag')));


server.use(function(req, res, next) {
  res.status(404).render('404', {url : req.url});
});
server.listen(process.env.PORT || 4000, function(){
    console.log('Server Start Port 4000')
})