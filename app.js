(function(){
  var express, path, bodyParser, async, ref$, filter, maximum, mongo, MongoClient, Grid, mongourl, mongourl2, getMongoDb, getMongoDb2, getGrid, getVarsCollection, getEventsCollection, getLogsCollection, getLogsEmailCollection, getLogsFbloginCollection, getLogsQuizCollection, getLogsFbCollection, app, get_index, get_control, get_matching, get_study1, getvar_new, setvar_new, getvar, setvar, getvardict, setvardict, postify, getify, setvar_express, getuserevents, getuserevents_old, getalluserevents_old, getalluserevents, getusereventsandcookies, getallusereventsandcookies, getallusereventsandcookies_old, settimestampforuserevent_express_old, settimestampforuserevent_express, changetimestampforuserevent_express, minidx, nextAssignedCondition, getConditionsCollection, getconditions, removeconditionforuser, setconditionforuser, conditionforuser, conditionforuser_old, condition_to_order, cookiesFromEventsConditionUsername, cookiesforuser, dictToItems, dictToKeys, addErrToCallback, getuserlist, getuserlist_old, asyncMapNoerr, cookiesforallusers, addlog, addlogemail;
  express = require('express');
  path = require('path');
  bodyParser = require('body-parser');
  async = require('async');
  ref$ = require('prelude-ls'), filter = ref$.filter, maximum = ref$.maximum;
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
  getVarsCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('vars'), db);
    });
  };
  getEventsCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('events'), db);
    });
  };
  getLogsCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('logs'), db);
    });
  };
  getLogsEmailCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('emaillogs'), db);
    });
  };
  getLogsFbloginCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('fblogin'), db);
    });
  };
  getLogsQuizCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('quiz'), db);
    });
  };
  getLogsFbCollection = function(callback){
    return getMongoDb2(function(db){
      return callback(db.collection('fblogs6'), db);
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
    var body;
    body = req.query;
    return getLogsCollection(function(logs, db){
      return logs.find(body).toArray(function(err, results){
        res.send(JSON.stringify(results));
        return db.close();
      });
    });
  });
  app.get('/viewlogemail', function(req, res){
    return getLogsEmailCollection(function(logs, db){
      return logs.find().toArray(function(err, results){
        res.send(JSON.stringify(results));
        return db.close();
      });
    });
  });
  app.get('/viewlogfblogin', function(req, res){
    var body;
    body = req.query;
    return getLogsFbloginCollection(function(logs, db){
      return logs.find(body).toArray(function(err, results){
        res.send(JSON.stringify(results));
        return db.close();
      });
    });
  });
  app.get('/viewlogquiz', function(req, res){
    var body;
    body = req.query;
    return getLogsQuizCollection(function(logs, db){
      return logs.find(body).toArray(function(err, results){
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
  app.get('/email-japanese.png', function(req, res){
    addlogemail({
      type: 'emailopened',
      username: req.query.emailuser,
      timesent: req.query.timesent,
      timeopened: Date.now()
    });
    return res.sendfile('feedlearn-email-japanese.png');
  });
  getvar_new = function(varname, callback){
    return getVarsCollection(function(varsCollection, db){
      return varsCollection.findOne({
        _id: varname
      }, function(err, result){
        if (result == null || result.val == null) {
          callback(null);
          db.close();
          return;
        }
        callback(result.val);
        return db.close();
      });
    });
  };
  setvar_new = function(varname, val, callback){
    return getVarsCollection(function(varsCollection, db){
      return varsCollection.save({
        _id: varname,
        name: varname,
        val: val
      }, function(err, result){
        if (callback != null) {
          callback(val);
        }
        return db.close();
      });
    });
  };
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
    return getEventsCollection(function(collection, db){
      return collection.findOne({
        _id: username
      }, function(err, result){
        if (result == null) {
          callback({});
        } else {
          callback(result);
        }
        return db.close();
      });
    });
  };
  getuserevents_old = function(username, callback){
    return getvardict('evts|' + username, callback);
  };
  app.get('/getuserevents', function(req, res){
    var username;
    username = req.query.username;
    return getuserevents(username, function(events){
      res.send(JSON.stringify(events));
    });
  });
  getalluserevents_old = function(callback){
    return getuserlist(function(userlist){
      var getUserAndEvents;
      getUserAndEvents = function(username, callback){
        return getuserevents(username, function(output){
          output.username = username;
          return callback(output);
        });
      };
      return asyncMapNoerr(userlist, getUserAndEvents, callback);
    });
  };
  getalluserevents = function(callback){
    return getEventsCollection(function(eventsCollection){
      return eventsCollection.find().toArray(function(err, results){
        return callback(results);
      });
    });
  };
  app.get('/getalluserevents', function(req, res){
    return getalluserevents(function(resultsArray){
      return res.send(JSON.stringify(resultsArray));
    });
  });
  getusereventsandcookies = function(username, callback){
    return getuserevents(username, function(events){
      return cookiesforuser(username, function(cookies){
        var output, res$, k, ref$, v;
        res$ = {};
        for (k in ref$ = events) {
          v = ref$[k];
          res$[k] = v;
        }
        output = res$;
        for (k in cookies) {
          v = cookies[k];
          output[k] = v;
        }
        return callback(output);
      });
    });
  };
  app.get('/getusereventsandcookies', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('{}');
      return;
    }
    return getusereventsandcookies(username, function(userevents){
      res.send(JSON.stringify(userevents));
    });
  });
  getallusereventsandcookies = function(callback){
    return getConditionsCollection(function(conditionsCollection){
      return conditionsCollection.find().toArray(function(err, conditionsResults){
        return getEventsCollection(function(eventsCollection){
          return eventsCollection.find().toArray(function(err2, eventsResults){
            var events_dictionary, i$, len$, x, output, ref$, curobj, res$, k, v, events_dict, ref1$;
            events_dictionary = {};
            if (eventsResults != null) {
              for (i$ = 0, len$ = eventsResults.length; i$ < len$; ++i$) {
                x = eventsResults[i$];
                if (x._id != null) {
                  events_dictionary[x._id] = x;
                }
              }
            }
            output = [];
            if (conditionsResults != null) {
              for (i$ = 0, len$ = (ref$ = conditionsResults).length; i$ < len$; ++i$) {
                x = ref$[i$];
                res$ = {};
                for (k in x) {
                  v = x[k];
                  res$[k] = v;
                }
                curobj = res$;
                if (events_dictionary[curobj._id] != null) {
                  events_dict = events_dictionary[curobj._id];
                  if (events_dict != null) {
                    for (k in events_dict) {
                      v = events_dict[k];
                      curobj[k] = v;
                    }
                    if (curobj != null && curobj._id != null && curobj.condition != null) {
                      for (k in ref1$ = cookiesFromEventsConditionUsername(events_dict, curobj.condition, curobj._id)) {
                        v = ref1$[k];
                        curobj[k] = v;
                      }
                    }
                  }
                }
                output.push(curobj);
              }
            }
            return callback(output);
          });
        });
      });
    });
  };
  app.get('/getallusereventsandcookies', function(req, res){
    return getallusereventsandcookies(function(resultsArray){
      return res.send(JSON.stringify(resultsArray));
    });
  });
  app.get('/getuserswhoneedemails', function(req, res){
    return getallusereventsandcookies(function(usereventInfo){
      var output, i$, len$, x, pretestTimes, starttime, dayselapsed;
      output = [];
      for (i$ = 0, len$ = usereventInfo.length; i$ < len$; ++i$) {
        x = usereventInfo[i$];
        if (x.format === 'none') {
          pretestTimes = filter(fn$, [x.pretest1, x.pretest2, x.pretest3]);
          if (pretestTimes.length === 0) {
            continue;
          }
          starttime = maximum(pretestTimes);
          if (starttime == null || !isFinite(starttime)) {
            continue;
          }
          dayselapsed = Math.floor(
          (Date.now() - starttime) / (1000 * 3600 * 24));
          if (0 <= dayselapsed && dayselapsed <= 6) {
            output.push({
              username: x.username,
              starttime: starttime,
              dayselapsed: dayselapsed
            });
          }
        }
      }
      return res.send(JSON.stringify(output));
      function fn$(it){
        return it != null;
      }
    });
  });
  app.get('/gettesttimes', function(req, res){
    return getallusereventsandcookies(function(resultsArray){
      var output, i$, len$, userinfo, j$, ref$, len1$, num;
      output = [];
      for (i$ = 0, len$ = resultsArray.length; i$ < len$; ++i$) {
        userinfo = resultsArray[i$];
        for (j$ = 0, len1$ = (ref$ = [1, 2, 3]).length; j$ < len1$; ++j$) {
          num = ref$[j$];
          if (userinfo['pretest' + num] != null && userinfo['posttest' + num] == null) {
            output.push({
              username: userinfo.username,
              test: 'pretest' + num,
              time: userinfo['pretest' + num] + 1000 * 3600 * 24 * 7
            });
            break;
          }
        }
      }
      return res.send(JSON.stringify(output));
    });
  });
  app.get('/gettesttimesreadable', function(req, res){
    return getallusereventsandcookies(function(resultsArray){
      var output, i$, len$, userinfo, j$, ref$, len1$, num;
      output = [];
      for (i$ = 0, len$ = resultsArray.length; i$ < len$; ++i$) {
        userinfo = resultsArray[i$];
        for (j$ = 0, len1$ = (ref$ = [1, 2, 3]).length; j$ < len1$; ++j$) {
          num = ref$[j$];
          if (userinfo['pretest' + num] != null && userinfo['posttest' + num] == null) {
            output.push({
              username: userinfo.username,
              test: 'pretest' + num,
              time: new Date(userinfo['pretest' + num] + 1000 * 3600 * 24 * 7).toString()
            });
            break;
          }
        }
      }
      return res.send(JSON.stringify(output));
    });
  });
  getallusereventsandcookies_old = function(callback){
    return getuserlist(function(userlist){
      return asyncMapNoerr(userlist, getusereventsandcookies, callback);
    });
  };
  app.get('/getallusereventsandcookies_old', function(req, res){
    return getallusereventsandcookies_old(function(resultsArray){
      return res.send(JSON.stringify(resultsArray));
    });
  });
  settimestampforuserevent_express_old = function(data, res){
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
  settimestampforuserevent_express = function(data, res){
    var username, eventname;
    username = data.username, eventname = data.eventname;
    if (username == null || eventname == null) {
      res.send('need username and eventname');
      return;
    }
    return getEventsCollection(function(eventsCollection, db){
      return eventsCollection.findOne({
        _id: username
      }, function(err, result){
        var newbody, updateinfo;
        if (result == null) {
          newbody = {
            _id: username,
            username: username
          };
          newbody[eventname] = Date.now();
          eventsCollection.save(newbody, function(){
            res.send('done');
            db.close();
          });
          return;
        }
        if (result[eventname] != null) {
          res.send('already set timestamp for event');
          db.close();
          return;
        }
        updateinfo = {};
        updateinfo[eventname] = Date.now();
        return eventsCollection.update({
          _id: username
        }, {
          $set: updateinfo
        }, function(){
          res.send('done');
          db.close();
        });
      });
    });
  };
  changetimestampforuserevent_express = function(data, res){
    var username, eventname, newval;
    username = data.username, eventname = data.eventname, newval = data.newval;
    if (newval == null) {
      res.send('need newval');
      return;
    }
    newval = parseInt(newval);
    if (!isFinite(newval)) {
      res.send('newval not valid');
      return;
    }
    if (username == null || eventname == null) {
      res.send('need username and eventname');
      return;
    }
    return getEventsCollection(function(eventsCollection, db){
      return eventsCollection.findOne({
        _id: username
      }, function(err, result){
        var newbody, updateinfo;
        if (result == null) {
          newbody = {
            _id: username,
            username: username
          };
          newbody[eventname] = newval;
          eventsCollection.save(newbody, function(){
            res.send('done');
            db.close();
          });
          return;
        }
        updateinfo = {};
        updateinfo[eventname] = newval;
        return eventsCollection.update({
          _id: username
        }, {
          $set: updateinfo
        }, function(){
          res.send('done');
          db.close();
        });
      });
    });
  };
  app.get('/removeuserevent_get', function(req, res){
    var ref$, username, eventname;
    ref$ = req.query, username = ref$.username, eventname = ref$.eventname;
    if (username == null || eventname == null) {
      res.send('need username and eventname');
      return;
    }
    return getEventsCollection(function(eventsCollection, db){
      var updateinfo;
      updateinfo = {};
      updateinfo[eventname] = '';
      return eventsCollection.update({
        _id: username
      }, {
        $unset: updateinfo
      }, function(){
        res.send('done');
        db.close();
      });
    });
  });
  app.get('/settimestampforuserevent_get', getify(settimestampforuserevent_express));
  app.get('/changetimestampforuserevent_get', getify(changetimestampforuserevent_express));
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
  getConditionsCollection = function(callback){
    return getMongoDb(function(db){
      return callback(db.collection('conditions'), db);
    });
  };
  getconditions = function(callback){
    return getConditionsCollection(function(conditionsCollection, db){
      return conditionsCollection.find().toArray(function(err, results){
        var output, i$, len$, ref$, username, condition;
        output = {};
        for (i$ = 0, len$ = results.length; i$ < len$; ++i$) {
          ref$ = results[i$], username = ref$.username, condition = ref$.condition;
          output[username] = condition;
        }
        callback(output);
        return db.close();
      });
    });
  };
  app.get('/conditions', function(req, res){
    return getconditions(function(conditions){
      return res.send(JSON.stringify(conditions));
    });
  });
  app.get('/conditions_old', function(req, res){
    return getvardict('conditions', function(conditions){
      return res.send(JSON.stringify(conditions));
    });
  });
  removeconditionforuser = function(username, donecallback){
    return getConditionsCollection(function(conditionsCollection, db){
      return conditionsCollection.remove({
        _id: username
      }, function(err, numremoved){
        if (donecallback != null) {
          donecallback(err, numremoved);
        }
        return db.close();
      });
    });
  };
  app.get('/removeconditionforuser_get', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return removeconditionforuser(username, function(){
      return res.send('done');
    });
  });
  app.get('/removeconditionforuser_get_old', function(req, res){
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
  setconditionforuser = function(username, condition, donecallback){
    return getConditionsCollection(function(conditionsCollection, db){
      return conditionsCollection.save({
        _id: username,
        username: username,
        condition: condition
      }, function(err, nummodified, status){
        if (donecallback != null) {
          donecallback(err, nummodified, status);
        }
        return db.close();
      });
    });
  };
  app.get('/setconditionforuser_get', function(req, res){
    var ref$, username, condition;
    ref$ = req.query, username = ref$.username, condition = ref$.condition;
    if (username == null || condition == null) {
      res.send('need to provide username and condition');
      return;
    }
    condition = parseInt(condition);
    return setconditionforuser(username, condition, function(){
      return res.send(JSON.stringify(condition));
    });
  });
  app.get('/setconditionforuser_get_old', function(req, res){
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
    return getConditionsCollection(function(conditionsCollection, db){
      return conditionsCollection.findOne({
        _id: username
      }, function(err, result){
        var condition;
        if (result != null && result.condition != null) {
          callback(result.condition);
          db.close();
          return;
        }
        condition = Math.floor(Math.random() * 2);
        return setconditionforuser(username, condition, function(){
          callback(condition);
          db.close();
        });
      });
    });
  };
  conditionforuser_old = function(username, callback){
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
  app.get('/conditionforuser_old', function(req, res){
    var username;
    username = req.query.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return conditionforuser_old(username, function(condition){
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
  getuserlist = function(callback){
    return getconditions(function(conditions){
      var usersArray;
      usersArray = dictToKeys(conditions);
      return callback(usersArray);
    });
  };
  getuserlist_old = function(callback){
    return getvardict('conditions', function(conditions){
      var usersArray;
      usersArray = dictToKeys(conditions);
      return callback(usersArray);
    });
  };
  app.get('/getuserlist', function(req, res){
    return getuserlist(function(userlist){
      return res.send(JSON.stringify(userlist));
    });
  });
  asyncMapNoerr = function(list, func, callback){
    return async.map(list, addErrToCallback(func), function(err, results){
      return callback(results);
    });
  };
  cookiesforallusers = function(callback){
    return getuserlist(function(userlist){
      return asyncMapNoerr(userlist, cookiesforuser, callback);
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
  addlog = function(data, callback){
    if (data.username == null) {
      callback('need to provide username');
      return;
    }
    return getLogsCollection(function(logs, db){
      return logs.insert(data, function(err, docs){
        if (err != null) {
          if (callback != null) {
            callback('error upon insertion: ' + JSON.stringify(err));
          }
        } else {
          if (callback != null) {
            callback('successful insertion');
          }
        }
        return db.close();
      });
    });
  };
  addlogemail = function(data, callback){
    if (data.username == null) {
      callback('need to provide username');
      return;
    }
    return getLogsEmailCollection(function(logs, db){
      return logs.insert(data, function(err, docs){
        if (err != null) {
          if (callback != null) {
            callback('error upon insertion: ' + JSON.stringify(err));
          }
        } else {
          if (callback != null) {
            callback('successful insertion');
          }
        }
        return db.close();
      });
    });
  };
  app.post('/addlog', function(req, res){
    var username;
    username = req.body.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return addlog(req.body, function(result){
      return res.send(result);
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
  app.post('/addlogfblogin', function(req, res){
    var username;
    username = req.body.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsFbloginCollection(function(logs, db){
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
  app.post('/addlogquiz', function(req, res){
    var username;
    username = req.body.username;
    if (username == null) {
      res.send('need to provide username');
      return;
    }
    return getLogsQuizCollection(function(logs, db){
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
