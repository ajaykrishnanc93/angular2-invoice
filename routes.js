var express = require('express');
var router = express.Router();
var app = express();

var url ='mongodb://localhost:27017/proj';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/proj');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
 var vendorSchema = mongoose.Schema({
    vname: String,
    vplace: String,
    vphone: Number,
    vemail: String
    }); 
var customerSchema = mongoose.Schema({
    cname: String,
    cplace: String,
    cphone: Number,
    cemail:String
    
});

var productSchema = mongoose.Schema({
    
    pname: String,
    ptype: String,
    pcost: Number,
    vname:String
    
});




var docSchema = mongoose.Schema({
    
    name: String,
    email: String,
    invoiceNumber: Number,
    products:[{
    
    productName: String,
    quantity: Number,
    cost: Number,
    total:Number
    
}],
    totalCost:Number,
    tax: Number,
    grandTotal: Number
    
});




var Vendor = mongoose.model('Vendor', vendorSchema,'vendors');
var Customer = mongoose.model('Customer', customerSchema,'customers');
var Product = mongoose.model('Product', productSchema,'products');
var Doc = mongoose.model('Doc', docSchema,'docs');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
db.collection('products').createIndex({vname:"text"});


//vendor
   router.route('/vendors').get( function(req, res) {
        Vendor.find({}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });

    
  


    router.route('/vendor').post(function(req, res) {
        var obj = new Vendor(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
     }); 
  
    router.route('/vendor/:id').get( function(req, res) {
        Vendor.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
      
	   })
    
	});

    
    router.route('/vendor/:id').put( function(req, res) {
        console.log(req.params.id)
        Vendor.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
     });

    
    router.route('/vendor/:id').delete( function(req, res) {
        Vendor.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
     });
 
     router.route('/vendors/:name').get( function(req, res) {
         Vendor.find({$text:{$search: req.params.name}}, function(err, obj) {
           if(err) return console.error(err);
            res.json(obj);
        })
     });  
        

        
  
  
	
	//customers
 router.route('/customers').get( function(req, res) {
        Customer.find({}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });



    router.route('/customer').post(function(req, res) {
        var obj = new Customer(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
     }); 
  
    router.route('/customer/:id').get( function(req, res) {
        Customer.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
      
       })
    
    });

    
    router.route('/customer/:id').put( function(req, res) {
        console.log(req.params.id)
        Customer.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
     });

    
    router.route('/customer/:id').delete( function(req, res) {
       Customer.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
     });
 
     router.route('/customers/:name').get( function(req, res) {
         Customer.find({$text:{$search: req.params.name}}, function(err, obj) {
           if(err) return console.error(err);
            res.json(obj);
        })
     });  



//products


 router.route('/products').get( function(req, res) {
        Product.find({}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });
router.route('/productss/:term').get( function(req, res) {
  Product.find({'pname': {'$regex':  req.params.term}}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });

 router.route('/productssss/:nam').get( function(req, res) {
        Product.findOne({pname: req.params.nam}, function(err,obj) {
           if(err) return console.error(err);
            res.json(obj);
        
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

 router.route('/product/:name').get( function(req, res) {
        Product.findOne({pname: req.params.name}, function (err, obj) {
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


//docs

 router.route('/doc').post(function(req, res) {
        var obj = new Doc(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
     }); 

router.route('/docs').get( function(req, res) {
       Doc.find({}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });

router.route('/docs').delete( function(req, res) {
        Doc.remove({}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
     });

 router.route('/doc/:id').delete( function(req, res) {
       Doc.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
     });


router.route('/invoices').get( function(req, res) {
        Invoice.find({}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });

 router.route('/doc/:id').put( function(req, res) {
        console.log(req.params.id)
        Doc.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
     });

 // router.route('/doc/:id').delete( function(req, res) {
 //       Doc.findOneAndRemove({_id: req.params.id}, function(err) {
 //            if(err) return console.error(err);
 //            res.sendStatus(200);
 //        });
 //     });

 router.route('/docss/:id').put( function(req, res) {
       Doc.findOneAndUpdate({}, {$pull:{products:{_id:req.params.id}}}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
     });




     router.route('/*').get(function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
        });

	 });
        
    module.exports = router;


