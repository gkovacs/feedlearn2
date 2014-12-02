(function(){
  var express, path, bodyParser, app, get_index;
  express = require('express');
  path = require('path');
  bodyParser = require('body-parser');
  app = express();
  app.use(bodyParser.json());
  app.use(express['static'](path.join(__dirname, '')));
  app.set('view engine', 'jade');
  app.set('views', __dirname);
  app.listen(8080, '0.0.0.0');
  console.log('Listening on port 8080');
  get_index = function(req, res){
    return res.render('index', {});
  };
  app.get('/', get_index);
  app.get('/index.html', get_index);
}).call(this);
