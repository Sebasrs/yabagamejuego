var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongoURI = "mongodb://sebasrs:Serbas1500@ds127439.mlab.com:27439/yaba";

const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

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

var questionsSchema = new mongoose.Schema({
		fecha: String,
		state: String,
		quien: String,
		answer: Number
});
//*********************************************

//Users on DB
var users = mongoose.model("user", profileSchema);

//Games on DB
var games = mongoose.model("game", gameSchema);

//Questions on DB
var questions = mongoose.model("question", questionsSchema);

app.get('/', function(req,res){
	res.render('tracker');
});

app.get('/:userId', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	console.log("GET on '/'")
  var userName = req.params.userId;

	users.find({Nombre:userName}, function(err, name){
		res.send(JSON.stringify(name[0]));
	});
});

app.get('/logs/:userId', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	var userName = req.params.userId;

	games.find({quien:userName}, function(err, games){
		res.send(JSON.stringify(games));
	});
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


app.get('/showStats/:username', function(req,res){
	var username = req.params.username;

	res.render('list', {username:username});
});

app.post('/newUser', function(req,res){
  var body = req.body;
  var name = body.nombre;

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

app.get('/getStats/:id', function(req,res){
	console.log("GET A STATS");
	res.setHeader('Content-Type', 'application/json');
	questions.find({quien:req.params.id}, function(err, questions){
		res.send(JSON.stringify(questions));
	});
});

app.post('/sendStats', function(req,res){
  var body = req.body;
  var id = body.id;
  var gameType = parseInt(body.type);
  var otherPeople = parseInt(body.cuanta);
  var time = parseInt(body.tiempoJuego);
  var date = body.fecha;

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

app.post('/updateLogros', function(req,res){
	var body = req.body;
	var id = body.id;
	var newAch = body.newLogro;
	console.log(body);
	users.find({Nombre:id}, function(err, user){
		var logros = user[0].Logros;
		var updatedLog = logros + ',' + newAch;
		if(updatedLog[0] === ',') updatedLog = updatedLog.substr(1);
		var newvalues = { $set: {Logros: updatedLog } };
		var myquery = {Nombre : id};
		users.updateOne(myquery, newvalues, function(err,response){
			res.send("Updated " + id);
		});
	})
});

app.post('/redirectToUser', function(req,res){
	var userId = req.body.username;
	res.redirect('/showStats/' + userId);
});

app.post('/addQuestionLog', function(req,res){
	var body = req.body;
	var id = body.id;
	var fecha = body.date;
	var punctuation = body.answer;
	var state = body.state;
	questions.create({
    quien : id,
    state : state,
    fecha : fecha,
		answer : parseInt(punctuation)
  }, function(err, game){
    console.log("Added " + game);
  });
	res.send("Done");
});

app.listen(PORT, function(){
	console.log("Serving Yaba games on port " + PORT);
});
