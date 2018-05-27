const express = require('express');
const server = express();
const session = require('express-session');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const router = require('./routers');
const  cookieParser = require('cookie-parser')

//erver.use(cookieParser());
server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: config.secret,
  saveUninitialized: true,
  resave: true,
  cookie: {maxAge: 60000 * 60 * 24 * 30 ,secure : false}
}))
server.use(cookieParser());

server.use('/', router);
// server.use('/*', router);


server.set('view engine', 'ejs');
server.set('views', './MVC/views');
server.use(express.static('./public'));


server.listen(process.env.PORT || 3000, function(){
    console.log('Server Start Port 3000')
})