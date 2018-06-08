const express = require('express');
const server = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const router = require('./routers');
const bodyParser = require('body-parser');
const  cookieParser = require('cookie-parser')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;



  server.use(require('body-parser').urlencoded({ extended: true }));
//erver.use(cookieParser());
server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 60000 * 60 * 24 * 30 ,secure : false}
}))
server.use(cookieParser());
server.use(passport.initialize());
server.use(passport.session());
server.use('/', router);
// server.use('/*', router);

server.set('view engine', 'ejs');
server.set('views', './MVC/views');
server.use(express.static('./public'));

server.use(function(req, res, next) {
  res.status(404).render('404', {url : req.url});
});
server.get('/video', function(req, res) {
  const path = 'assets/sample.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
server.listen(process.env.PORT || 4000, function(){
    console.log('Server Start Port 4000')
})