const express = require('express');
const server = express();

server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('./public'));

server.get('/', (req, res)=>{
    res.render('index.ejs')
})

server.listen(3000, function(){
    console.log('Server Start Port 3000')
})