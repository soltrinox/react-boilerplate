// Server - Configuration
'use strict';

// JS imports
const express = require('express');
const app = express();
const path = require('path');
const {
  join
} = require('path');
const serviceWorker = (app) => (req, res) => {
  const filePath = join(__dirname, 'build', 'service-worker.js');

  app.serveStatic(req, res, filePath);
};
const compression = require('compression');
const bodyParser = require('body-parser');

// Compression
app.use(compression());
// JSON support
app.use(bodyParser.json());
// URL Encoding
app.use(bodyParser.urlencoded({
  extended: true,
}));
// Routes
// Service Worker
app.get('/service-worker.js', serviceWorker(app));
// Enable router support
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// CRUD
app.post('/', function(req, res) {
  res.send('Got a POST request');
});
app.put('/', function(req, res) {
  res.send('Got a PUT request');
});
app.delete('/', function(req, res) {
  res.send('Got a DELETE request');
});
// CSP
app.post('/csp-report', (req, res) => {
  if (req.body) {
    console.log('CSP Violation: ', req.body);
  } else {
    console.log('CSP Violation: No data received!');
  }

  res.status(204).end();
});
// General
app.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;

  console.log('> Ready on http://localhost:3000');
});
