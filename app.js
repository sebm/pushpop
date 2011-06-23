
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

var the_stack = new Array();

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express',
    stack: the_stack
  });
});

app.get('/push', function(req, res){
  the_stack.push(Math.random());

  res.render('index', {
    title: 'Express',
    stack: the_stack
  });
});

app.get('/pop', function(req, res){
  var popped = (the_stack.length)? the_stack.pop() : null;

  res.render('pop', {
    title: 'Express',
    stack: the_stack,
    popped: popped
  });
});


app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
