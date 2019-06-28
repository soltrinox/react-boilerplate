// Server - Configuration
const express = require('express');
const app = express();
const path = require('path');

// Assets Exposing
app.use('/static', express.static(__dirname + 'public'));
// CRUD
// Enable router support
app.get('/*', function(req, res) {
  // TODO: In production dirname must be changed to 'build'
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/', function(req, res) {
  res.send('Got a POST request');
});
app.put('/', function(req, res) {
  res.send('Got a PUT request');
});
app.delete('/', function(req, res) {
  res.send('Got a DELETE request');
});
app.listen(3000, function() {
  // TODO: In production change localhost to proper URL
  console.log('> Ready on http://localhost:3000');
});
