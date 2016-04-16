var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/be-mean-instagram');

const Schema = mongoose.Schema;
const pokemonSchema = new Schema({
  name:  String,
  description: String,
  type:   String
});

const Model = mongoose.model('pokemon', pokemonSchema);

//console.log(pokemonSchema);


var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var query = {};
    
    Model.find(query, function(err, data) {
        if (err) {
            console.log("ERRO NA QUERY ", err);
        }
        
        res.json(data);
    });
});

router.get('/:id', function(req, res, next) {
    var query = {_id: req.params.id};
    
    Model.findOne(query, function(err, data) {
        if (err) {
            console.log("ERRO NA QUERY ", err);
        }
        
        res.json(data);
    });
});


router.post('/', function(req, res, next) {
    var body = req.body;
    var pokemon = new Model(body);
    
    pokemon.save(function(err, data) {
        if (err) {
            console.log("ERRO INSERT");
        }
        res.json(data);
        
    });
});



/* GET users listing. */
router.put('/:id', function(req, res, next) {
    var query = {_id: req.params.id};
    var body = req.body;
    
    Model.update(query, body, function(err, data) {
        
        if (err) {
            console.log("ERRO NA QUERY ", err);
        }
        
        res.json(data);
    });
});


router.delete('/:id', function(req, res, next) {
    var query = {_id: req.params.id};
    
    Model.remove(query, function(err, data) {
        if (err) {
            console.log("ERRO NA QUERY ", err);
        }
        
        res.json(data);
    });
});


module.exports = router;
