var express = require('express');
var router = express.Router();

/*function getplayerPerGame(db, callback){
	var collection = db.get('playerPerGame');
	collection.find({},{},function(e,docs) {
		callback(docs);
		//jsonDocs = docs;
		//res.json(docs);
	});
} */

// function joinObjects() {
//   console.log("iii");
//   var idMap = {};
//   // Iterate over arguments
//   for(var i = 0; i < arguments.length; i++) { 
//     // Iterate over individual argument arrays (aka json1, json2)
//     for(var j = 0; j < arguments[i].length; j++) {
//        var currentID = arguments[i][j]['char'];
//        if(!idMap[currentID]) {
//           idMap[currentID] = {};
//         }
//        // Iterate over properties of objects in arrays (aka id, name, etc.)
//       for(key in arguments[i][j]) {
//           idMap[currentID][key] = arguments[i][j][key];
//       }
//     }
//   }
//   // push properties of idMap into an array
//   var newArray = [];
//   for(property in idMap) {
//     newArray.push(idMap[property]);
//   }
//   return newArray;
// };  


/* GET users listing. */
router.get('/userlist', function(req, res) {
	// var db = req.db;
	// //var collection = db.get('userlist');
	// var collection = db.get('overall');
	// collection.find({},{},function(e,docs) {
	// 	res.json(docs);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("overall");   
   		var cursor = collection.find({},{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});
});

/* GET users listing. */
router.get('/playerPerGame/:play_ID', function(req, res) {
	// var db = req.db;	
	// var playToShow;
	// playToShow = req.params.play_ID;
	// var collection = db.get('test1');		
	// collection.find({ 'play_Id' : playToShow },{},function(e,docs) {		
	// 	res.json(docs);
	// });

	var playToShow = req.params.play_ID;
	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("gamePlayers");   
   		var cursor = collection.find({ 'play_Id' : playToShow },{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});		

});

router.post('/adduser', function(req, res) {
	var db = req.db;
	var collection = db.get('userlist');	
	console.log(req.body);
	collection.insert(req.body, function(err, result) {
		res.send(
			(err === null) ? { msg: ''} : { msg: err } 
			);
	});
});

router.post('/addGame', function(req, res) {
	// var db = req.db;
	// var collection = db.get('playData');	
	// collection.insert(req.body, function(err, result) {
	// 	res.send(
	// 		(err === null) ? { msg: ''} : { msg: err } 
	// 		);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("playData");      		
		collection.insert(req.body, function(err, result) {
			res.send(
				(err === null) ? { msg: ''} : { msg: err } 
				);
		});

   		db.close();
	
	});		
});

router.post('/addPlayerInGame', function(req, res) {
	// var db = req.db;
	// var collection = db.get('playerPerGame');	
	// console.log(req.body);
	// collection.insert(req.body, function(err, result) {
	// 	res.send(
	// 		(err === null) ? { msg: ''} : { msg: err } 
	// 		);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("playerPerGame");   	
		collection.insert(req.body, function(err, result) {
			res.send(
				(err === null) ? { msg: ''} : { msg: err } 
				);
		});

   		db.close();
	
	});	

});

//DELETE 
router.delete('/deleteuser/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('userlist');
	var userToDelete = req.params.id;
	collection.remove({ '_id' : userToDelete}, function(err) {
		res.send((err === null) ? { msg: ''} : { msg: 'error:' + 'err'});
	});
});


//cahr
router.get('/char/:index', function(req, res) {
	// var db = req.db;
	// var collection = db.get('char');
	// var charID = req.params.index;
	// collection.find({ 'index' : charID},{}, function(e,docs) {
	// 	res.json(docs);
	// });

	var charID = req.params.index;
	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("char");   
   		var cursor = collection.find({'index' : charID},{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});	
});

//cahr
router.get('/char/', function(req, res) {
	// var db = req.db;
	// var collection = db.get('char');
	// collection.find({},{}, function(e,docs) {
	// 	res.json(docs);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("char");   
   		var cursor = collection.find({},{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});	
});


//players
router.get('/playersList/', function(req, res) {
	//Version for local development
	// var db = req.db;
	// var collection = db.get('players');
	// collection.find({},{}, function(e,docs) {
	// 	res.json(docs);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("players");   
   		var cursor = collection.find({},{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});


});

//scenarios
router.get('/scenarioList/', function(req, res) {
	// var db = req.db;
	// var collection = db.get('scenarios');
	// collection.find({},{}, function(e,docs) {
	// 	res.json(docs);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("scenarios");   
   		var cursor = collection.find({},{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});
});

//equipments
router.get('/equipList/', function(req, res) {
	// var db = req.db;
	// var collection = db.get('equipment');
	// collection.find({},{}, function(e,docs) {
	// 	res.json(docs);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("equipment");   
   		var cursor = collection.find({},{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});
});

//equipments
router.get('/skillList/', function(req, res) {
	// var db = req.db;
	// var collection = db.get('skills');
	// collection.find({},{}, function(e,docs) {
	// 	res.json(docs);
	// });

	var path = req.uri;
	req.MongoClient.connect(path, function(err, db) {
   		const collection = db.db("Runbound").collection("skills");   
   		var cursor = collection.find({},{});   		
		cursor.toArray(function (err, data){
    	if(err) {
      		return console.log(err);
    	}
    		res.json(data);
   		} );

   		db.close();
	
	});
});

module.exports = router;
