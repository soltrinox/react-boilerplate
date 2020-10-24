// Module Start
// JS imports
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import path from 'path';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import * as csp from 'helmet-csp';
import fs from 'fs';
import https from 'https';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import { ApolloClient } from 'apollo-client';
import { ChunkExtractor } from '@loadable/server';
import Root from '../src/components/Root';
import { apiOptions } from '../src/utils';

// Server
const app = express();
const ssl = {
  key: fs.readFileSync('./server/server.key'),
  cert: fs.readFileSync('./server/server.crt')
};
const serviceWorker = (app) => (req, res) => {
  const filePath = path.resolve('./build/service-worker.js');

  app.serveStatic(req, res, filePath);
};
// App chunks
const statsFile = path.resolve(
  (process.env.NODE_ENV === 'production') ?
  './public/dist/loadable-stats.json' :
  './public/lib/loadable-stats.json'
);
const extractor = new ChunkExtractor({statsFile});

// Build
app.use(express.static('./build'));
// Compression
app.use(compression());
// JSON support
app.use(bodyParser.json());
// URL Encoding
app.use(bodyParser.urlencoded({
  extended: true
}));
// CSP
app.use(csp({
  directives: {
    defaultSrc: [
      "'none'"
    ],
    scriptSrc: [
      "'self'",
      'www.google.com',
      'www.gstatic.com',
      'storage.googleapis.com',
      'www.googletagmanager.com',
      'tagmanager.google.com',
      'www.google-analytics.com',
      'apis.google.com',
      "'unsafe-eval'",
      "'unsafe-inline'"
    ],
    connectSrc: [
      "'self'",
      'api.emailjs.com',
      'www.google.com',
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'stats.g.doubleclick.net',
      'ws:',
      'localhost',
      'localhost:4000',
      'http://localhost:4000',
      'https://localhost:4000'
    ],
    styleSrc: [
      "'self'",
      'www.gstatic.com',
      'fonts.googleapis.com',
      'tagmanager.google.com',
      "'unsafe-inline'"
    ],
    fontSrc: [
      "'self'",
      'fonts.gstatic.com',
      'fonts.googleapis.com',
      'data:'
    ],
    imgSrc: [
      "'self'",
      'www.google-analytics.com',
      'stats.g.doubleclick.net',
      'ssl.gstatic.com',
      'i.creativecommons.org',
      'licensebuttons.net',
      'data:'
    ],
    frameSrc: [
      "'self'",
      'www.google.com',
      'accounts.google.com'
    ],
    formAction: ["'self'"],
    manifestSrc: ["'self'"],
    reportTo: '/csp-report',
    reportUri: '/csp-report',
  }
}));
// Routes
// Service Worker
app.get('/service-worker.js', serviceWorker(app));
// Enable router support
app.get('/*', (req, res) => {
  // Apollo instantiation
  const client = new ApolloClient(apiOptions);
  const context = {};
  const jsx = extractor.collectChunks(
    <StaticRouter location={req.url} context={context}>
      <Root client={client} />
    </StaticRouter>
  );
  const html = ReactDOMServer.renderToString(jsx);
  const indexFile = path.resolve('./build/index.html');

  // Redirects
  // Context check
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    fs.readFile(indexFile, 'utf8', (err, data) => {
      // Error check
      if (err) {
        console.error('Something went wrong: ', err);

        return res.status(500).send('Internal Server Error');
      }
      // Status check
      if (context.status === 404) {
        res.status(404);
      }

      data = data.replace(/\$LANG/g, req.t('common.language.code'));
      data = data.replace(/\$LANG_ALTERNATE/g, req.t('common.language.alternate'));
      data = data.replace(/(?<=\<title\>).*?(?=\<\/title\>)/g, req.t('seo.title'));
      data = data.replace(/\$TITLE/g, req.t('seo.title'));
      data = data.replace(/\$KEYWORDS/g, req.t('seo.keywords'));
      data = data.replace(/\$DESCRIPTION/g, req.t('seo.description'));
      data = data.replace(/\$PUBLIC_URL/g, 'https://localhost:3000');
      data = data.replace('</head>', `${extractor.getLinkTags()}</head>`);
      data = data.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
      data = data.replace('</body>', `${extractor.getScriptTags()}</body>`);

      return res.send(data);
    });
  }
});
// CSP
app.post('/csp-report', (req, res) => {
  // Report check
  if (req.body) {
    console.log('CSP Violation: ', req.body);
  } else {
    console.log('CSP Violation: No data received!');
  }

  res.status(204).end();
});
// General
https.createServer(ssl, app).listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;

  console.log(`> Ready on https://localhost:${process.env.PORT || 3000}`);
});
// Module End
