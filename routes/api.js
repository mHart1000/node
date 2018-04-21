const express = require ('express');
const router = express.Router();
const Park = require('../models/park');
const fs = require('fs');
let zips = fs.readFileSync('data/zips.json', 'utf-8');

zips = zips.trim()
	.split('\r\n')
	.map(x => JSON.parse(x))

// get a list of parks from the db
router.get('/parks', function(req, res, next){
    /* Park.find({}).then(function(parks){
        res.send(parks);
    }); */  
	for(i=0;i<zips.length;i++) {
		if (zips[i]._id === req.query.zip) { 
			lati = zips[i].loc[1];
			longi = zips[i].loc[0];
		}
	}
	 
    Park.geoNear(
        {type: 'Point', coordinates: [longi, lati]},
        {limit: 3, spherical: true}
    ).then(function(parks){
        res.send(parks);
    }).catch(next);
});



router.get('/parks/:name', (req, res, next) => {
	Park.find({"name": req.params.name}).then(park => res.send(park))
});

// add a new park to the db
router.post('/parks', function(req, res, next){
    Park.create(req.body).then(function(park){
        res.send(park);
    }).catch(next);
});

// update a park in the db
router.put('/parks/:id', function(req, res, next){
    Park.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Park.findOne({_id: req.params.id}).then(function(park){
            res.send(park);
        });
    }).catch(next);
});

// delete a park from the db
router.delete('/parks/:id', function(req, res, next){
    Park.findByIdAndRemove({_id: req.params.id}).then(function(park){
        res.send(park);
    }).catch(next);
});

module.exports = router;
