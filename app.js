(function(){
  var express, path, bodyParser, app, get_index, get_control;
  express = require('express');
  path = require('path');
  bodyParser = require('body-parser');
  app = express();
  app.use(bodyParser.json());
  app.use(express['static'](path.join(__dirname, '')));
  app.set('view engine', 'jade');
  app.set('views', __dirname);
  app.set('port', process.env.PORT || 5000);
  app.listen(app.get('port'), '0.0.0.0');
  console.log('Listening on port ' + app.get('port'));
  get_index = function(req, res){
    return res.render('index', {});
  };
  app.get('/', get_index);
  app.get('/index.html', get_index);
  get_control = function(req, res){
    return res.render('control', {});
  };
  app.get('/control', get_control);
  app.get('/control.html', get_control);
}).call(this);
