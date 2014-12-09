require! {
  'express'
  'path'
  'body-parser': 'bodyParser'
}

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

# POST statements

app.post '/addlog', (req, res) ->
  username = req.body.username
  if not username?
    res.send 'need to provide username'
    return
  console.log req.body
