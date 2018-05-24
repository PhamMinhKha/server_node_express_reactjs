const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const config = require('./config/config');

// const schema = require('./config/schemas/schema');


server.set('trust proxy', 1) // trust first proxy
server.use(session({
  secret: config.secret,
  cookie: {maxAge: 60000 * 60 * 24 * 30 }
}))


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('./public'));

server.get('/', (req, res)=>{
    res.render('trangchu.ejs')
})
server.get('/*', (req, res)=>{
    res.render('index.ejs')
})
server.post('/login', urlencodedParser, (req, res) =>{
    if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.txtUserName)
  req.session.user = 'fucking cat';
  console.log(req.session)
  var token = jwt.sign({ foo: 'Minh kha' }, 'shhhhh');
  console.log(token)
  var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded.foo) // bar
})
server.listen(process.env.PORT || 3000, function(){
    console.log('Server Start Port 3000')
})