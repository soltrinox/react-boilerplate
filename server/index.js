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
import { ApolloClient } from '@apollo/client';
import { ChunkExtractor } from '@loadable/server';
import Root from '../src/components/Root';
import { apiOptions } from '../src/utils';

// Server
const app = express();
const ssl = {
  key: fs.readFileSync('./server/server.key'),
  cert: fs.readFileSync('./server/server.crt'),
};
const serviceWorker = (application) => (req, res) => {
  const filePath = path.resolve('./build/service-worker.js');

  application.serveStatic(req, res, filePath);
};
// App chunks
const statsFile = path.resolve(
  process.env.NODE_ENV === 'production'
    ? './public/dist/loadable-stats.json'
    : './public/lib/loadable-stats.json',
);
const extractor = new ChunkExtractor({ statsFile });

// Build
app.use(express.static('./build'));
// Compression
app.use(compression());
// JSON support
app.use(bodyParser.json());
// URL Encoding
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// CSP
app.use(
  csp({
    directives: {
      defaultSrc: ["'none'"],
      prefetchSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        'www.google.com',
        'www.google-analytics.com',
        'www.googletagmanager.com',
        'www.gstatic.com',
        'storage.googleapis.com',
        'tagmanager.google.com',
        "'unsafe-eval'",
        "'unsafe-inline'",
      ],
      styleSrc: [
        "'self'",
        'fonts.googleapis.com',
        'tagmanager.google.com',
        "'unsafe-inline'",
      ],
      connectSrc: [
        "'self'",
        'www.google.com',
        'www.google-analytics.com',
        'www.googletagmanager.com',
        'stats.g.doubleclick.net',
        'tagmanager.google.com',
        'localhost',
        'ws:',
      ],
      fontSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', 'data:'],
      imgSrc: [
        "'self'",
        'www.google-analytics.com',
        'i.creativecommons.org',
        'licensebuttons.net',
        'ssl.gstatic.com',
        'stats.g.doubleclick.net',
        'localhost',
        'data:',
      ],
      manifestSrc: ["'self'"],
      reportTo: '/csp-report',
      reportUri: '/csp-report',
    },
  }),
);
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
    </StaticRouter>,
  );
  const html = ReactDOMServer.renderToString(jsx);
  const indexFile = path.resolve('./build/index.html');

  // Redirects
  // Context check
  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
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

      data = data.replace(/\$LANG/g, 'LANG');
      data = data.replace(/(?<=\<title\>).*?(?=\<\/title\>)/g, 'TITLE');
      data = data.replace(/\$TITLE/g, 'TITLE');
      data = data.replace(/\$KEYWORDS/g, 'KEYS');
      data = data.replace(/\$DESCRIPTION/g, 'DESCRIPTION');
      data = data.replace(/\$PUBLIC_URL/g, 'https://localhost:3000');
      data = data.replace('</head>', `${extractor.getLinkTags()}</head>`);
      data = data.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`,
      );
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
