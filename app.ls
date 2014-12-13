require! {
  'express'
  'path'
  'body-parser'
  'async'
}

# mongo

mongo = require 'mongodb'
{MongoClient, Grid} = mongo
mongourl = process.env.MONGOHQ_URL
mongourl2 = process.env.MONGOLAB_URI
if not mongourl?
  mongourl = 'mongodb://localhost:27017/default'
if not mongourl2?
  mongourl2 = mongourl

get-mongo-db = (callback) ->
  #MongoClient.connect mongourl, {
  #  auto_reconnect: true
  #  poolSize: 20
  #  socketOtions: {keepAlive: 1}
  #}, (err, db) ->
  MongoClient.connect mongourl, (err, db) ->
    if err
      console.log 'error getting mongodb'
    else
      callback db

get-mongo-db2 = (callback) ->
  MongoClient.connect mongourl2, (err, db) ->
    if err
      console.log 'error getting mongodb2'
    else
      callback db

get-grid = (callback) ->
  get-mongo-db (db) ->
    callback Grid(db), db

get-vars-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('vars'), db

get-events-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('events'), db

get-logs-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('logs'), db

get-logs-email-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('emaillogs'), db

get-logs-fb-collection = (callback) ->
  get-mongo-db2 (db) ->
    callback db.collection('fblogs'), db

# Express initialization

app = express()

app.use bodyParser.json()
app.use express.static(path.join(__dirname, ''))

app.set 'view engine', 'jade'
app.set 'views', __dirname

app.set 'port', (process.env.PORT || 5000)

app.listen app.get('port'), '0.0.0.0'
console.log 'Listening on port ' + app.get('port')

# GET statements

get_index = (req, res) ->
  #res.render 'index', {}
  res.sendfile 'index.html'

app.get '/', get_index
app.get '/index.html', get_index

get_control = (req, res) ->
  #res.render 'control', {}
  res.sendfile 'control.html'

app.get '/control', get_control
app.get '/control.html', get_control

get_matching = (req, res) ->
  #res.render 'matching', {}
  res.sendfile 'matching.html'

app.get '/matching', get_matching
app.get '/matching.html', get_matching

get_study1 = (req, res) ->
  #res.render 'study1', {}
  res.sendfile 'study1.html'

app.get '/study1', get_study1
app.get '/study1.html', get_study1

app.get '/viewlog', (req, res) ->
  get-logs-collection (logs, db) ->
    logs.find().toArray (err, results) ->
      res.send <| JSON.stringify results
      db.close()

app.get '/viewlogemail', (req, res) ->
  get-logs-email-collection (logs, db) ->
    logs.find().toArray (err, results) ->
      res.send <| JSON.stringify results
      db.close()

app.get '/viewlogfb', (req, res) ->
  get-logs-fb-collection (logs, db) ->
    logs.find().toArray (err, results) ->
      res.send <| JSON.stringify results
      db.close()

app.get '/email-japanese.png', (req, res) ->
  addlogemail {type: 'emailopened', username: req.query.emailuser, timesent: req.query.timesent, timeopened: Date.now()}
  res.sendfile 'feedlearn-email-japanese.png'

getvar_new = (varname, callback) ->
  get-vars-collection (vars-collection, db) ->
    vars-collection.findOne {_id: varname}, (err, result) ->
      if not result? or not result.val?
        callback null
        db.close()
        return
      callback result.val
      db.close()

setvar_new = (varname, val, callback) ->
  get-vars-collection (vars-collection, db) ->
    vars-collection.save {_id: varname, name: varname, val: val}, (err, result) ->
      if callback?
        callback val
      db.close()

getvar = (varname, callback) ->
  get-grid (grid, db) ->
    key = 'gvr|' + varname
    #console.log 'key is: ' + key
    grid.get key, (err, res) ->
      #console.log 'res is: ' + res
      #console.log key
      #console.log res
      #console.log err
      if res?
        callback res.toString('utf-8')
      else
        callback null
      db.close()

setvar = (varname, body, callback) ->
  get-grid (grid, db) ->
    key = 'gvr|' + varname
    grid.put new Buffer(body, 'utf-8'), {_id: key}, (err, res) ->
      #console.log key
      #console.log err
      #console.log res
      if callback?
        callback res
      db.close()

getvardict = (varname, callback) ->
  getvar varname, (output) ->
    #console.log varname
    #console.log output
    if output?
      callback JSON.parse(output)
    else
      callback {}

setvardict = (varname, vardict, callback) ->
  setvar varname, JSON.stringify(vardict), callback

#add-keyval-to-vardict = (varname, key, val, callback) ->
#  getvardict varname, (vardict) ->
#    vardict[key] = val
#    setvardict varname, vardict, callback

app.get '/getvar', (req, res) ->
  {varname} = req.query
  if not varname?
    res.send 'need to provide varname'
    return
  getvar varname, (varval) ->
    res.send varval

postify = (f) -> # f takes data, res
  return (req, res) -> f(req.body, res)

getify = (f) -> # f takes data, res
  return (req, res) -> f(req.query, res)

setvar_express = (data, res) ->
  {varname, varval} = data
  if not varname? or not varval?
    res.send 'need to provide varname and varval'
    return
  setvar varname, varval, ->
    res.send 'done'
    return

app.get '/setvar_get', getify(setvar_express)

getuserevents = (username, callback) ->
  get-events-collection (collection, db) ->
    collection.findOne {_id: username}, (err, result) ->
      if not result?
        callback {}
      else
        callback result
      db.close()

getuserevents_old = (username, callback) ->
  getvardict ('evts|' + username), callback

app.get '/getuserevents', (req, res) ->
  {username} = req.query
  getuserevents username, (events) ->
    #console.log 'getuserevents'
    #console.log events
    #console.log JSON.stringify events
    res.send <| JSON.stringify events
    return

getalluserevents_old = (callback) ->
  getuserlist (userlist) ->
    get-user-and-events = (username, callback) ->
      getuserevents username, (output) ->
        output.username = username
        callback(output)
    async-map-noerr userlist, get-user-and-events, callback

getalluserevents = (callback) ->
  get-events-collection (events-collection) ->
    events-collection.find().toArray (err, results) ->
      callback results

app.get '/getalluserevents', (req, res) ->
  getalluserevents (results-array) ->
    res.send JSON.stringify results-array

getusereventsandcookies = (username, callback) ->
  getuserevents username, (events) ->
    cookiesforuser username, (cookies) ->
      output = {[k,v] for k,v of events}
      for k,v of cookies
        output[k] = v
      callback output

getallusereventsandcookies = (callback) ->
  getuserlist (userlist) ->
    async-map-noerr userlist, getusereventsandcookies, callback


app.get '/getallusereventsandcookies', (req, res) ->
  getallusereventsandcookies (results-array) ->
    res.send JSON.stringify results-array

settimestampforuserevent_express_old = (data, res) ->
  {username, eventname} = data
  #console.log 'settimestampforuserevent_express'
  #console.log username
  #console.log eventname
  if not username? or not eventname?
    res.send 'need username and eventname'
    return
  getuserevents username, (events) ->
    if events[eventname]?
      res.send 'already set timestamp for event'
      return
    else
      events[eventname] = Date.now()
      setvardict ('evts|' + username), events, ->
        res.send 'done'
        return

settimestampforuserevent_express = (data, res) ->
  {username, eventname} = data
  #console.log 'settimestampforuserevent_express'
  #console.log username
  #console.log eventname
  if not username? or not eventname?
    res.send 'need username and eventname'
    return
  get-events-collection (events-collection, db) ->
    events-collection.findOne {_id: username}, (err, result) ->
      if not result?
        newbody = {_id: username, username: username}
        newbody[eventname] = Date.now()
        events-collection.save newbody, ->
          res.send 'done'
          db.close()
          return
        return
      if result[eventname]?
        res.send 'already set timestamp for event'
        db.close()
        return
      updateinfo = {}
      updateinfo[eventname] = Date.now()
      events-collection.update {_id: username}, {$set: updateinfo}, ->
        res.send 'done'
        db.close()
        return

app.get '/removeuserevent_get', (req, res) ->
  {username, eventname} = req.query
  if not username? or not eventname?
    res.send 'need username and eventname'
    return
  get-events-collection (events-collection, db) ->
    updateinfo = {}
    updateinfo[eventname] = ''
    events-collection.update {_id: username}, {$unset: updateinfo}, ->
      res.send 'done'
      db.close()
      return

app.get '/settimestampforuserevent_get', getify(settimestampforuserevent_express)


minidx = (list) ->
  minval = Infinity
  minidx = 0
  for x,i in list
    if x < minval
      minidx = i
      minval = x
  return minidx

next-assigned-condition = (conditions) ->
  counts = [0] * 6
  for k,v of conditions
    if (0 <= v <= 5)
      counts[v] += 1
  return minidx(counts)

get-conditions-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('conditions'), db

getconditions = (callback) ->
  get-conditions-collection (conditions-collection, db) ->
    conditions-collection.find().toArray (err, results) ->
      output = {}
      for {username, condition} in results
        output[username] = condition
      callback output
      db.close()

app.get '/conditions', (req, res) ->
  getconditions (conditions) ->
    res.send <| JSON.stringify conditions

app.get '/conditions_old', (req, res) ->
  getvardict 'conditions', (conditions) ->
    res.send <| JSON.stringify conditions

removeconditionforuser = (username, donecallback) ->
  get-conditions-collection (conditions-collection, db) ->
    conditions-collection.remove {_id: username}, (err, numremoved) ->
      if donecallback?
        donecallback(err, numremoved)
      db.close()

app.get '/removeconditionforuser_get', (req, res) ->
  {username} = req.query
  if not username?
    res.send 'need to provide username'
    return
  removeconditionforuser username, ->
    res.send 'done'

app.get '/removeconditionforuser_get_old', (req, res) ->
  {username} = req.query
  if not username?
    res.send 'need to provide username'
    return
  getvardict 'conditions', (conditions) ->
    if conditions[username]?
      delete conditions[username]
      setvardict 'conditions', conditions, ->
        res.send 'done'
        return
    else
      res.send 'user was not in the conditions list'
      return

setconditionforuser = (username, condition, donecallback) ->
  get-conditions-collection (conditions-collection, db) ->
    conditions-collection.save {_id: username, username: username, condition: condition}, (err, nummodified, status) ->
      if donecallback?
        donecallback(err, nummodified, status)
      db.close()

app.get '/setconditionforuser_get', (req, res) ->
  {username, condition} = req.query
  if not username? or not condition?
    res.send 'need to provide username and condition'
    return
  condition = parseInt condition
  setconditionforuser username, condition, ->
    res.send JSON.stringify condition

app.get '/setconditionforuser_get_old', (req, res) ->
  {username, condition} = req.query
  if not username? or not condition?
    res.send 'need to provide username and condition'
    return
  getvardict 'conditions', (conditions) ->
    conditions[username] = parseInt condition
    setvardict 'conditions', conditions, ->
      res.send <| JSON.stringify condition

conditionforuser = (username, callback) ->
  get-conditions-collection (conditions-collection, db) ->
    conditions-collection.findOne {_id: username}, (err, result) ->
      if result? and result.condition?
        callback result.condition
        db.close()
        return
      condition = Math.floor(Math.random() * 6)
      setconditionforuser username, condition, ->
        callback condition
        db.close()
        return

conditionforuser_old = (username, callback) ->
  if not username?
    callback 0
    return
  getvardict 'conditions', (conditions) ->
    if conditions[username]?
      callback <| parseInt conditions[username]
    else
      conditions[username] = next-assigned-condition conditions
      setvardict 'conditions', conditions, ->
        callback <| parseInt conditions[username]

app.get '/conditionforuser', (req, res) ->
  {username} = req.query
  if not username?
    res.send 'need to provide username'
    return
  conditionforuser username, (condition) ->
    res.send <| JSON.stringify condition

app.get '/conditionforuser_old', (req, res) ->
  {username} = req.query
  if not username?
    res.send 'need to provide username'
    return
  conditionforuser_old username, (condition) ->
    res.send <| JSON.stringify condition

condition_to_order = [
  <[ interactive link none ]>
  <[ interactive none link ]>
  <[ link interactive none ]>
  <[ link none interactive ]>
  <[ none interactive link ]>
  <[ none link interactive ]>
]

cookies-from-events-condition-username = (events, condition, username) ->
  output = {}
  output.username = username
  if not (0 <= condition <= 5)
    return output
  output.condition = condition
  if not (events.pretest1? or events.pretest2? or events.pretest3?)
    return output
  partnum = switch
  | events.pretest3? => 2
  | events.pretest2? => 1
  | events.pretest1? => 0
  output.lang = ['japanese1', 'japanese2', 'japanese3'][partnum]
  output.format = condition_to_order[condition][partnum]
  return output

cookiesforuser = (username, callback) ->
  conditionforuser username, (condition) ->
    if not (0 <= condition <= 5)
      callback {}
      return
    getuserevents username, (events) ->
      callback cookies-from-events-condition-username(events, condition, username)
      return

app.get '/cookiesforuser', (req, res) ->
  {username} = req.query
  if not username?
    res.send '{}'
    return
  cookiesforuser username, (cookies) ->
    res.send <| JSON.stringify cookies
    return

dict-to-items = (dict) ->
  return [[k,v] for k,v of dict]

dict-to-keys = (dict) ->
  return [k for k,v of dict]

add-err-to-callback = (f) ->
  return (x, callback) ->
    f x, (results) ->
      callback(null, results)

getuserlist = (callback) ->
  getconditions (conditions) ->
    users-array = dict-to-keys conditions
    callback users-array

getuserlist_old = (callback) ->
  getvardict 'conditions', (conditions) ->
    users-array = dict-to-keys conditions
    callback users-array

app.get '/getuserlist', (req, res) ->
  getuserlist (userlist) ->
    res.send JSON.stringify userlist

async-map-noerr = (list, func, callback) ->
  async.map list, add-err-to-callback(func), (err, results) ->
    callback results

cookiesforallusers = (callback) ->
  getuserlist (userlist) ->
    async-map-noerr userlist, cookiesforuser, callback

app.get '/cookiesforallusers', (req, res) ->
  cookiesforallusers (results-array) ->
    res.send JSON.stringify results-array
    return

app.get '/addlog_get', (req, res) ->
  username = req.query.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-collection (logs, db) ->
    logs.insert req.query, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'
      db.close()

app.get '/addlogfb_get', (req, res) ->
  username = req.query.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-fb-collection (logs, db) ->
    logs.insert req.query, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'
      db.close()

#app.get '/getvar', (req, res) ->
#  req.

# POST statements

app.post '/setvar', postify(setvar_express)

app.post '/settimestampforuserevent', postify(settimestampforuserevent_express)

addlog = (data, callback) ->
  if not data.username?
    callback 'need to provide username'
    return
  get-logs-collection (logs, db) ->
    logs.insert data, (err, docs) ->
      if err?
        if callback?
          callback <| 'error upon insertion: ' + JSON.stringify(err)
      else
        if callback?
          callback <| 'successful insertion'
      db.close()

addlogemail = (data, callback) ->
  if not data.username?
    callback 'need to provide username'
    return
  get-logs-email-collection (logs, db) ->
    logs.insert data, (err, docs) ->
      if err?
        if callback?
          callback <| 'error upon insertion: ' + JSON.stringify(err)
      else
        if callback?
          callback <| 'successful insertion'
      db.close()

app.post '/addlog', (req, res) ->
  username = req.body.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  addlog req.body, (result) ->
    res.send result

app.post '/addlogfb', (req, res) ->
  username = req.body.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-fb-collection (logs, db) ->
    logs.insert req.body, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'
      db.close()

