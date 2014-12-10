require! {
  'express'
  'path'
  'body-parser': 'bodyParser'
}

# mongo

mongo = require 'mongodb'
{MongoClient} = mongo
mongourl = process.env.MONGOHQ_URL
if not mongourl?
  mongourl = 'mongodb://localhost:27017/default'

get-mongo-db = (callback) ->
  MongoClient.connect mongourl, {
    auto_reconnect: true
    poolSize: 20
    socketOtions: {keepAlive: 1}
  }, (err, db) ->
    if err
      console.log 'error getting mongodb'
    else
      callback db

get-logs-collection = (callback) ->
  get-mongo-db (db) ->
    callback db.collection('logs') #, db

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
