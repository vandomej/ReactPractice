var path = require('path');
var express = require('express');
var port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname, 'src')));

app.get(/\/(index([.]html)?)?$/, function(req, res, next) {
  console.log('index');
})

app.get('*', function(req, res) {
  console.log('error');
  res.status(404);
  res.send();
})

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});
