require! {
  'express'
  'path'
  'body-parser': 'bodyParser'
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

get-logs-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('logs'), db

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

app.get '/viewlogfb', (req, res) ->
  get-logs-fb-collection (logs, db) ->
    logs.find().toArray (err, results) ->
      res.send <| JSON.stringify results
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

app.get '/getuserevents', (req, res) ->
  {username} = req.query
  getvardict ('evts|' + username), (events) ->
    #console.log 'getuserevents'
    #console.log events
    #console.log JSON.stringify events
    res.send <| JSON.stringify events
    return

settimestampforuserevent_express = (data, res) ->
  {username, eventname} = data
  #console.log 'settimestampforuserevent_express'
  #console.log username
  #console.log eventname
  if not username? or not eventname?
    res.send 'need username and eventname'
    return
  getvardict ('evts|' + username), (events) ->
    if events[eventname]?
      res.send 'already set timestamp for event'
      return
    else
      events[eventname] = Date.now()
      setvardict ('evts|' + username), events, ->
        res.send 'done'
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
    if 0 <= v <= 5
      counts[v] += 1
  return minidx(counts)

app.get '/conditions', (req, res) ->
  getvardict 'conditions', (conditions) ->
    res.send <| JSON.stringify conditions

app.get '/setconditionforuser_get', (req, res) ->
  {username, condition} = req.query
  if not username? or not condition?
    res.send 'need to provide username and condition'
    return
  getvardict 'conditions', (conditions) ->
    conditions[username] = condition
    setvardict 'conditions', conditions, ->
      res.send condition

app.get '/conditionforuser', (req, res) ->
  {username} = req.query
  if not username?
    res.send 'need to provide username'
    return
  getvardict 'conditions', (conditions) ->
    if conditions[username]?
      res.send <| JSON.stringify conditions[username]
    else
      conditions[username] = next-assigned-condition conditions
      setvardict 'conditions', conditions, ->
        res.send <| JSON.stringify conditions[username]


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

app.post '/addlog', (req, res) ->
  username = req.body.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-collection (logs, db) ->
    logs.insert req.body, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'
      db.close()

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

