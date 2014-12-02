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

