var mongoose = require('mongoose');                     // mongoose for mongodb
var db = mongoose.connect('mongodb://localhost/reviewking');
var SubscriberSchema = {
    sim: String,
    location: String,
    cin: String,
    name: String,
    offre_appel :String,
    offre_data : String,
    //consommation_appel : Array[],
    //consommation_data : Array[]


};

module.exports = db.model('Subscriber',SubscriberSchema)