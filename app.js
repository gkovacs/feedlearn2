(function(){
  var express, path, bodyParser, mongo, MongoClient, mongourl, getMongoDb, getLogsCollection, app, get_index, get_control, get_matching, get_study1;
  express = require('express');
  path = require('path');
  bodyParser = require('body-parser');
  mongo = require('mongodb');
  MongoClient = mongo.MongoClient;
  mongourl = process.env.MONGOHQ_URL;
  if (mongourl == null) {
    mongourl = 'mongodb://localhost:27017/default';
  }
  getMongoDb = function(callback){
    return MongoClient.connect(mongourl, {
      auto_reconnect: true,
      poolSize: 20,
      socketOtions: {
        keepAlive: 1
      }
    }, function(err, db){
      if (err) {
        return console.log('error getting mongodb');
      } else {
        return callback(db);
      }
    });
  };
  getLogsCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('logs'));
    });
  };
  app = express();
  app.use(bodyParser.json());
  app.use(express['static'](path.join(__dirname, '')));
  app.set('view engine', 'jade');
  app.set('views', __dirname);
  app.set('port', process.env.PORT || 5000);
  app.listen(app.get('port'), '0.0.0.0');
  console.log('Listening on port ' + app.get('port'));
  get_index = function(req, res){
    return res.render('index', {});
  };
  app.get('/', get_index);
  app.get('/index.html', get_index);
  get_control = function(req, res){
    return res.render('control', {});
  };
  app.get('/control', get_control);
  app.get('/control.html', get_control);
  get_matching = function(req, res){
    return res.render('matching', {});
  };
  app.get('/matching', get_matching);
  app.get('/matching.html', get_matching);
  get_study1 = function(req, res){
    return res.render('study1', {});
  };
  app.get('/study1', get_study1);
  app.get('/study1.html', get_study1);
  app.get('/viewlog', function(req, res){
    return getLogsCollection(function(logs){
      return logs.find().toArray(function(err, results){
        return res.send(JSON.stringify(results));
      });
    });
  });
  app.post('/addlog', function(req, res){
    var username;
    username = req.body.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsCollection(function(logs){
      return logs.insert(req.body, function(err, docs){
        if (err != null) {
          return res.send('error upon insertion: ' + JSON.stringify(err));
        } else {
          return res.send('successful insertion');
        }
      });
    });
  });
}).call(this);
