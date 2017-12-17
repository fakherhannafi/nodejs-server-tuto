var mongoose = require('mongoose');                     // mongoose for mongodb
var db = mongoose.connect('mongodb://localhost/reviewking');
var ReviewSchema = {
    offre_data: String,
    duree: String,
    data: Number
};

module.exports = db.model('Review',ReviewSchema)