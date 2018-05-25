var express = require('express');
var router = express.Router();

// Require controller modules.
// var book_controller = require('../controllers/bookController');
// var author_controller = require('../controllers/authorController');
// var genre_controller = require('../controllers/genreController');
// var book_instance_controller = require('../controllers/bookinstanceController');

router.get('/', function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
});

module.exports = router;