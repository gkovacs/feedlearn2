(function(){
  var express, path, bodyParser, mongo, MongoClient, Grid, mongourl, mongourl2, getMongoDb, getMongoDb2, getGrid, getLogsCollection, getLogsFbCollection, app, get_index, get_control, get_matching, get_study1, getvar, setvar;
  express = require('express');
  path = require('path');
  bodyParser = require('body-parser');
  mongo = require('mongodb');
  MongoClient = mongo.MongoClient, Grid = mongo.Grid;
  mongourl = process.env.MONGOHQ_URL;
  mongourl2 = process.env.MONGOLAB_URI;
  if (mongourl == null) {
    mongourl = 'mongodb://localhost:27017/default';
  }
  if (mongourl2 == null) {
    mongourl2 = mongourl;
  }
  getMongoDb = function(callback){
    return MongoClient.connect(mongourl, function(err, db){
      if (err) {
        return console.log('error getting mongodb');
      } else {
        return callback(db);
      }
    });
  };
  getMongoDb2 = function(callback){
    return MongoClient.connect(mongourl2, function(err, db){
      if (err) {
        return console.log('error getting mongodb2');
      } else {
        return callback(db);
      }
    });
  };
  getGrid = function(callback){
    return getMongoDb(function(db){
      return callback(Grid(db));
    });
  };
  getLogsCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('logs'));
    });
  };
  getLogsFbCollection = function(callback){
    return getMongoDb2(function(db){
      return callback(db.collection('fblogs'));
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
  app.get('/viewlogfb', function(req, res){
    return getLogsFbCollection(function(logs){
      return logs.find().toArray(function(err, results){
        return res.send(JSON.stringify(results));
      });
    });
  });
  getvar = function(varname, callback){
    return getGrid(function(grid){
      var key;
      key = 'gvr|' + varname;
      return grid.get(key, function(err, res){
        return calback(res);
      });
    });
  };
  setvar = function(varname, body, callback){
    return getGrid(function(grid){
      var key;
      key = 'gvr|' + varname;
      return grid.put(body, {
        _id: key
      }, function(err, res){
        return callback(res);
      });
    });
  };
  app.get('/addlog_get', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsCollection(function(logs){
      return logs.insert(req.query, function(err, docs){
        if (err != null) {
          return res.send('error upon insertion: ' + JSON.stringify(err));
        } else {
          return res.send('successful insertion');
        }
      });
    });
  });
  app.get('/addlogfb_get', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsFbCollection(function(logs){
      return logs.insert(req.query, function(err, docs){
        if (err != null) {
          return res.send('error upon insertion: ' + JSON.stringify(err));
        } else {
          return res.send('successful insertion');
        }
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
  app.post('/addlogfb', function(req, res){
    var username;
    username = req.body.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsFbCollection(function(logs){
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
