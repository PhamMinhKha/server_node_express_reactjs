const mongoose = require('mongoose');

var Schema =  mongoose.Schema({
            categoryName : String,
            categoryIcon: String,
            categoryDescription: String,
            categorySlug: String,
            categoryNSFW: Boolean,
            categoryBgImage: String,
            categoryStatus: Boolean
        })
   
module.exports = mongoose.model('categories', Schema);