var express = require('express');
var path = require('path');
var app = express();
var port = 8000;

app.use(express.static(__dirname))

app.use(function(req, res, next) {
  if (req.path.length > 1 && /\/$/.test(req.path)) {
    var query = req.url.slice(req.path.length)
    res.redirect(301, req.path.slice(0, -1) + query)
  } else {
    next()
  }
});

app.get("*/*", function(req, res) {
	res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.listen(port, function(){
	console.log('Server is listening at ' + port);	
});
