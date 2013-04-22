var express = require('express');
var fs = require('fs');
var winston = require('winston');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(logErrors);
app.use(errorHandler);

// Redirect non-www to www
//app.all('*', require('./www.js'));

// Home Page
app.get('/', function(req, res){
  fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, html){
    res.send(html);
  });
});

// Should be last route (301 redirects and 404s)
app.get('*', require('./redirects.js'));



// Error Logger
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

// Catch-all error handler
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.listen(3000);