// Server - Configurazione
const express = require('express');
const app = express();

// Assets Exposing
app.use('/static', express.static(__dirname + 'public'));
// CRUD
app.get('/', function(req, res) {
  res.send('Hello World!');
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
  console.log('> Ready on http://localhost:3000');
});