var request = require('request');
const categoryModel = require('./../models/categoryModel');
const saveFile = require('./../utilities/saveFile');

exports.loadCategory = function(req, res){
    var categorys = categoryModel.find({}, (err, doc) =>{
        res.json(doc);
    });
}