const mongodb = require('mongoose');
const config = require('./../../config/config');
mongodb.connect(config.connectdb).then(()=>console.log('connect success mongo'));

mongodb.Promise = global.Promise;
var db = mongodb.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
