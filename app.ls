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

app.listen(8080, '0.0.0.0')
console.log 'Listening on port 8080'

# GET statements

get_index = (req, res) ->
  res.render 'index', {}

app.get '/', get_index
app.get '/index.html', get_index

