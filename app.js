var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest2');
db.options = {
  safe : true,
  castIds : false
};

var MongoClient = require('mongodb').MongoClient;

//var uri = "mongodb://claudiovtramos@gmail.com:Bardo001#@mycluster0-shard-00-00.mongodb.net:27017,mycluster0-shard-00-01.mongodb.net:27017,mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin";
var uri = "mongodb://bravobardo:CgbUynR8LbvHaIMb@cluster0-shard-00-00-ybdkk.mongodb.net:27017,cluster0-shard-00-01-ybdkk.mongodb.net:27017,cluster0-shard-00-02-ybdkk.mongodb.net:27017/Runbound?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
MongoClient.connect(uri, function(err, db) {
   const collection = db.db("Runbound").collection("players");
   // perform actions on the collection object   
   var cursor = collection.find({},{});   
   cursor.count(function (err, num){
    if(err) {
      return console.log(err);
    }
    return console.log(num);
   } );

   cursor.toArray(function (err, data){
    if(err) {
      return console.log(err);
    }
    return console.log(data);
   } );
   //collection.findOne({ '_id' : '1'},{}, function(e,docs) {
   // console.log(docs);
  //});
   db.close();
});

var index = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    req.MongoClient = MongoClient;
    req.uri = uri;
    next();
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
