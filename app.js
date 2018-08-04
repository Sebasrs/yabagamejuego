var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongoURI = "mongodb://sebasrs:Serbas1500@ds127439.mlab.com:27439/yaba";

const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));

//Schemas *************************************
var gameSchema = new mongoose.Schema({
		cuanto: Number,
    cuantaGente: Number,
    fecha: String,
    quien: String,
    gameType: Number
	});

var profileSchema = new mongoose.Schema({
    Nombre: String,
    Logros: String
});
//*********************************************

app.get('/:userId', function(req,res){
  var userName = req.params.userId;
  res.send(userName);
});

app.post('/newUser', function(req,res){
  var body = req.body;
  var name = body.nombre;
  var users = mongoose.model("user", profileSchema);

  users.find({Nombre:name}, function(err, names){

	if(Object.keys(names).length){
		console.log("User already exists", names);
	}else{
		users.create({
		Nombre: name,
    Logros: ""
  }, function(err, user){
			if(err){
				cosole.log(err);
			}else{
				console.log("Added" + user)
			}
		});
	}
	});
  res.send("Add user")
});

app.post('/sendStats', function(req,res){
  var body = req.body;
  var id = body.id;
  var gameType = parseInt(body.type);
  var otherPeople = parseInt(body.cuanta);
  var time = parseInt(body.tiempoJuego);
  var date = body.fecha;

  var games = mongoose.model("game", gameSchema);

  games.create({
    cuanto : time,
    cuantaGente : otherPeople,
    fecha : date,
    quien : id,
    gameType : gameType
  }, function(err, game){
    console.log("Added " + game);
  });

  res.send("Add game");
});

app.listen(PORT, function(){
	console.log("Serving Yaba games on port " + PORT);
});
