var mongoose = require('mongoose');                     // mongoose for mongodb
var db = mongoose.connect('mongodb://localhost:27017/reviewking');
var OffreDataSchema = {
    offre_data: String,
    duree: String,
    data: Number
};

module.exports = db.model('OffreData',OffreDataSchema)