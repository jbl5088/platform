
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes.js')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.getIndex);
app.get('/lite', routes.getLite);
app.get('/literesults', routes.getLiteResults);
app.get('/partial', routes.getPartial);

//Posts
app.post('/liteanalysis', routes.liteanalysis);
app.post('/partialanalysis', routes.partialanalysis);
app.post('/testpost', routes.testpost);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
