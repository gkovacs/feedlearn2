(function(){
  var express, path, bodyParser, async, map, mongo, MongoClient, Grid, mongourl, mongourl2, getMongoDb, getMongoDb2, getGrid, getLogsCollection, getLogsFbCollection, app, get_index, get_control, get_matching, get_study1, getvar, setvar, getvardict, setvardict, postify, getify, setvar_express, getuserevents, settimestampforuserevent_express, minidx, nextAssignedCondition, conditionforuser, condition_to_order, cookiesFromEventsConditionUsername, cookiesforuser, dictToItems, dictToKeys, addErrToCallback, cookiesforallusers;
  express = require('express');
  path = require('path');
  bodyParser = require('body-parser');
  async = require('async');
  map = require('prelude-ls').map;
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
      return callback(Grid(db), db);
    });
  };
  getLogsCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('logs'), db);
    });
  };
  getLogsFbCollection = function(callback){
    return getMongoDb2(function(db){
      return callback(db.collection('fblogs'), db);
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
    return res.sendfile('index.html');
  };
  app.get('/', get_index);
  app.get('/index.html', get_index);
  get_control = function(req, res){
    return res.sendfile('control.html');
  };
  app.get('/control', get_control);
  app.get('/control.html', get_control);
  get_matching = function(req, res){
    return res.sendfile('matching.html');
  };
  app.get('/matching', get_matching);
  app.get('/matching.html', get_matching);
  get_study1 = function(req, res){
    return res.sendfile('study1.html');
  };
  app.get('/study1', get_study1);
  app.get('/study1.html', get_study1);
  app.get('/viewlog', function(req, res){
    return getLogsCollection(function(logs, db){
      return logs.find().toArray(function(err, results){
        res.send(JSON.stringify(results));
        return db.close();
      });
    });
  });
  app.get('/viewlogfb', function(req, res){
    return getLogsFbCollection(function(logs, db){
      return logs.find().toArray(function(err, results){
        res.send(JSON.stringify(results));
        return db.close();
      });
    });
  });
  getvar = function(varname, callback){
    return getGrid(function(grid, db){
      var key;
      key = 'gvr|' + varname;
      return grid.get(key, function(err, res){
        if (res != null) {
          callback(res.toString('utf-8'));
        } else {
          callback(null);
        }
        return db.close();
      });
    });
  };
  setvar = function(varname, body, callback){
    return getGrid(function(grid, db){
      var key;
      key = 'gvr|' + varname;
      return grid.put(new Buffer(body, 'utf-8'), {
        _id: key
      }, function(err, res){
        if (callback != null) {
          callback(res);
        }
        return db.close();
      });
    });
  };
  getvardict = function(varname, callback){
    return getvar(varname, function(output){
      if (output != null) {
        return callback(JSON.parse(output));
      } else {
        return callback({});
      }
    });
  };
  setvardict = function(varname, vardict, callback){
    return setvar(varname, JSON.stringify(vardict), callback);
  };
  app.get('/getvar', function(req, res){
    var varname;
    varname = req.query.varname;
    if (varname == null) {
      res.send('need to provide varname');
      return;
    }
    return getvar(varname, function(varval){
      return res.send(varval);
    });
  });
  postify = function(f){
    return function(req, res){
      return f(req.body, res);
    };
  };
  getify = function(f){
    return function(req, res){
      return f(req.query, res);
    };
  };
  setvar_express = function(data, res){
    var varname, varval;
    varname = data.varname, varval = data.varval;
    if (varname == null || varval == null) {
      res.send('need to provide varname and varval');
      return;
    }
    return setvar(varname, varval, function(){
      res.send('done');
    });
  };
  app.get('/setvar_get', getify(setvar_express));
  getuserevents = function(username, callback){
    return getvardict('evts|' + username, callback);
  };
  app.get('/getuserevents', function(req, res){
    var username;
    username = req.query.username;
    return getuserevents(username, function(events){
      res.send(JSON.stringify(events));
    });
  });
  settimestampforuserevent_express = function(data, res){
    var username, eventname;
    username = data.username, eventname = data.eventname;
    if (username == null || eventname == null) {
      res.send('need username and eventname');
      return;
    }
    return getuserevents(username, function(events){
      if (events[eventname] != null) {
        res.send('already set timestamp for event');
      } else {
        events[eventname] = Date.now();
        return setvardict('evts|' + username, events, function(){
          res.send('done');
        });
      }
    });
  };
  app.get('/removeuserevent_get', function(req, res){
    var ref$, username, eventname;
    ref$ = req.query, username = ref$.username, eventname = ref$.eventname;
    if (username == null || eventname == null) {
      res.send('need username and eventname');
      return;
    }
    return getuserevents(username, function(events){
      if (events[eventname] != null) {
        delete events[eventname];
        return setvardict('evts|' + username, events, function(){
          res.send('done');
        });
      } else {
        res.send('eventname was not in the events list');
      }
    });
  });
  app.get('/settimestampforuserevent_get', getify(settimestampforuserevent_express));
  minidx = function(list){
    var minval, minidx, i$, len$, i, x;
    minval = Infinity;
    minidx = 0;
    for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
      i = i$;
      x = list[i$];
      if (x < minval) {
        minidx = i;
        minval = x;
      }
    }
    return minidx;
  };
  nextAssignedCondition = function(conditions){
    var counts, k, v;
    counts = [0, 0, 0, 0, 0, 0];
    for (k in conditions) {
      v = conditions[k];
      if (0 <= v && v <= 5) {
        counts[v] += 1;
      }
    }
    return minidx(counts);
  };
  app.get('/conditions', function(req, res){
    return getvardict('conditions', function(conditions){
      return res.send(JSON.stringify(conditions));
    });
  });
  app.get('/removeconditionforuser_get', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getvardict('conditions', function(conditions){
      if (conditions[username] != null) {
        delete conditions[username];
        return setvardict('conditions', conditions, function(){
          res.send('done');
        });
      } else {
        res.send('user was not in the conditions list');
      }
    });
  });
  app.get('/setconditionforuser_get', function(req, res){
    var ref$, username, condition;
    ref$ = req.query, username = ref$.username, condition = ref$.condition;
    if (username == null || condition == null) {
      res.send('need to provide username and condition');
      return;
    }
    return getvardict('conditions', function(conditions){
      conditions[username] = parseInt(condition);
      return setvardict('conditions', conditions, function(){
        return res.send(JSON.stringify(condition));
      });
    });
  });
  conditionforuser = function(username, callback){
    if (username == null) {
      callback(0);
      return;
    }
    return getvardict('conditions', function(conditions){
      if (conditions[username] != null) {
        return callback(parseInt(conditions[username]));
      } else {
        conditions[username] = nextAssignedCondition(conditions);
        return setvardict('conditions', conditions, function(){
          return callback(parseInt(conditions[username]));
        });
      }
    });
  };
  app.get('/conditionforuser', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return conditionforuser(username, function(condition){
      return res.send(JSON.stringify(condition));
    });
  });
  condition_to_order = [['interactive', 'link', 'none'], ['interactive', 'none', 'link'], ['link', 'interactive', 'none'], ['link', 'none', 'interactive'], ['none', 'interactive', 'link'], ['none', 'link', 'interactive']];
  cookiesFromEventsConditionUsername = function(events, condition, username){
    var output, partnum;
    output = {};
    output.username = username;
    if (!(0 <= condition && condition <= 5)) {
      return output;
    }
    output.condition = condition;
    if (!(events.pretest1 != null || events.pretest2 != null || events.pretest3 != null)) {
      return output;
    }
    partnum = (function(){
      switch (false) {
      case events.pretest3 == null:
        return 2;
      case events.pretest2 == null:
        return 1;
      case events.pretest1 == null:
        return 0;
      }
    }());
    output.lang = ['japanese1', 'japanese2', 'japanese3'][partnum];
    output.format = condition_to_order[condition][partnum];
    return output;
  };
  cookiesforuser = function(username, callback){
    return conditionforuser(username, function(condition){
      if (!(0 <= condition && condition <= 5)) {
        callback({});
        return;
      }
      return getuserevents(username, function(events){
        callback(cookiesFromEventsConditionUsername(events, condition, username));
      });
    });
  };
  app.get('/cookiesforuser', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('{}');
      return;
    }
    return cookiesforuser(username, function(cookies){
      res.send(JSON.stringify(cookies));
    });
  });
  dictToItems = function(dict){
    var k, v;
    return (function(){
      var ref$, results$ = [];
      for (k in ref$ = dict) {
        v = ref$[k];
        results$.push([k, v]);
      }
      return results$;
    }());
  };
  dictToKeys = function(dict){
    var k, v;
    return (function(){
      var ref$, results$ = [];
      for (k in ref$ = dict) {
        v = ref$[k];
        results$.push(k);
      }
      return results$;
    }());
  };
  addErrToCallback = function(f){
    return function(x, callback){
      return f(x, function(results){
        return callback(null, results);
      });
    };
  };
  cookiesforallusers = function(callback){
    return getvardict('conditions', function(conditions){
      var usersArray;
      usersArray = dictToKeys(conditions);
      return async.map(usersArray, addErrToCallback(cookiesforuser), function(err, results){
        return callback(results);
      });
    });
  };
  app.get('/cookiesforallusers', function(req, res){
    return cookiesforallusers(function(resultsArray){
      res.send(JSON.stringify(resultsArray));
    });
  });
  app.get('/addlog_get', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsCollection(function(logs, db){
      return logs.insert(req.query, function(err, docs){
        if (err != null) {
          res.send('error upon insertion: ' + JSON.stringify(err));
        } else {
          res.send('successful insertion');
        }
        return db.close();
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
    return getLogsFbCollection(function(logs, db){
      return logs.insert(req.query, function(err, docs){
        if (err != null) {
          res.send('error upon insertion: ' + JSON.stringify(err));
        } else {
          res.send('successful insertion');
        }
        return db.close();
      });
    });
  });
  app.post('/setvar', postify(setvar_express));
  app.post('/settimestampforuserevent', postify(settimestampforuserevent_express));
  app.post('/addlog', function(req, res){
    var username;
    username = req.body.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsCollection(function(logs, db){
      return logs.insert(req.body, function(err, docs){
        if (err != null) {
          res.send('error upon insertion: ' + JSON.stringify(err));
        } else {
          res.send('successful insertion');
        }
        return db.close();
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
    return getLogsFbCollection(function(logs, db){
      return logs.insert(req.body, function(err, docs){
        if (err != null) {
          res.send('error upon insertion: ' + JSON.stringify(err));
        } else {
          res.send('successful insertion');
        }
        return db.close();
      });
    });
  });
}).call(this);
