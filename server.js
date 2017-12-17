// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var Review = require('./ReviewModel');
var OffreData = require('./OffreDataModel');  
var Subscriber = require('./SubscriberModel'); 
// Configuration


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models

 
// Routes
 
    // Get reviews
    //Review.methodes(['get','put','delete','post']);

/*******************Reviews get*******************/
    app.get('/api/reviews', function(req, res) {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        Review.find({} ,function(err, response) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err); 
            else res.send(response); // return all reviews in JSON format
            console.log(response);
        });
    });

    


/****************Subscriber collection get********************/
    app.get('/api/subscribers', function(req, res) {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        Subscriber.find({} ,function(err, response) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err); 
            else res.send(response); // return all reviews in JSON format
            console.log(response);
        });
    });
     app.get('api/reviews/', function(req, res) {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        Review.find({name: req.params.name} ,function(err, response) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err); 
            else res.send(response); // return all reviews in JSON format
            console.log(response);
        });
    });
    // create review and send back all reviews after creation
    app.post('/api/reviews', function(req, res) {
 
        console.log("creating review");
        var new_review = new Review(req.body);
        // create a review, information comes from request from Ionic
        new_review.save(function(err, review) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err)
                res.json(reviews);
            });
        });
 
    });
 
    // delete a review
    app.delete('/api/reviews/:review_id', function(req, res) {
        Review.find({_id:req.params.review_id }).remove(function(err,response){
                if(err) res.json(err);
                else res.json(response);
        })
    });

    app.put('/api/reviews/:review_id',function(req,res){
        Review.update({_id:req.params.review_id},req.body,function(err,data){
           if(err) res.json(error);
           else res.json(data);
                
        })
    })
 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");