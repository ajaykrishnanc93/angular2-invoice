var express = require('express');
var router = express.Router();


var url ='mongodb://localhost:27017/test';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
var productSchema = mongoose.Schema({
    pname: String,
    lat: Number,
    lng: Number
    
});
var Product = mongoose.model('Product', productSchema);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
db.collection('products').createIndex({pname:"text"});



   router.route('/products').get( function(req, res) {
        Product.find({}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });

    
   router.route('/products/count').get( function(req, res) {
        Product.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
     });


    router.route('/product').post(function(req, res) {
        var obj = new Product(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
     });
  
    router.route('/product/:id').get( function(req, res) {
        Product.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
     });

    
    router.route('/product/:id').put( function(req, res) {
        console.log(req.params.id)
        Product.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
     });

    
    router.route('/product/:id').delete( function(req, res) {
        Product.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
     });

    router.route('/products/:name').get( function(req, res) {
         Product.find({$text:{$search: req.params.name}}, function(err, obj) {
           if(err) return console.error(err);
            res.json(obj);
        })
     }); 
        
  
	
	 router.route('/*').get(function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
        });

	 });
        
    module.exports = router;


