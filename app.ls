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
    callback Grid(db)

get-logs-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('logs') #, db

get-logs-fb-collection = (callback) ->
  get-mongo-db2 (db) ->
    callback db.collection('fblogs') #, db

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
  res.render 'index', {}

app.get '/', get_index
app.get '/index.html', get_index

get_control = (req, res) ->
  res.render 'control', {}

app.get '/control', get_control
app.get '/control.html', get_control

get_matching = (req, res) ->
  res.render 'matching', {}

app.get '/matching', get_matching
app.get '/matching.html', get_matching

get_study1 = (req, res) ->
  res.render 'study1', {}

app.get '/study1', get_study1
app.get '/study1.html', get_study1

app.get '/viewlog', (req, res) ->
  get-logs-collection (logs) ->
    logs.find().toArray (err, results) ->
      res.send <| JSON.stringify results

app.get '/viewlogfb', (req, res) ->
  get-logs-fb-collection (logs) ->
    logs.find().toArray (err, results) ->
      res.send <| JSON.stringify results


getvar = (varname, callback) ->
  get-grid (grid) ->
    key = 'gvr|' + varname
    grid.get key, (err, res) ->
      calback res

setvar = (varname, body, callback) ->
  get-grid (grid) ->
    key = 'gvr|' + varname
    grid.put body, {_id: key}, (err, res) ->
      callback(res)

app.get '/addlog_get', (req, res) ->
  username = req.query.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-collection (logs) ->
    logs.insert req.query, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'

app.get '/addlogfb_get', (req, res) ->
  username = req.query.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-fb-collection (logs) ->
    logs.insert req.query, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'

#app.get '/getvar', (req, res) ->
#  req.

# POST statements

app.post '/addlog', (req, res) ->
  username = req.body.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-collection (logs) ->
    logs.insert req.body, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'

app.post '/addlogfb', (req, res) ->
  username = req.body.username
  if not username?
    res.send 'need to provide username'
    return
  #console.log req.body
  get-logs-fb-collection (logs) ->
    logs.insert req.body, (err, docs) ->
      if err?
        res.send <| 'error upon insertion: ' + JSON.stringify(err)
      else
        res.send <| 'successful insertion'

