// src/server.js
// FAT SERVER
import path from 'path';
import { Server } from 'http';
import Express from 'express';

// should be set from client navigator settings - for Material UI styles
global.navigator = { userAgent: 'chrome' };

import { renderToString } from 'react-dom/server';
import React from 'react';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from '../src/app.js';
import reducer from '../src/reducer.js';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '../dist')));

const renderPage = (req, res, store) => {

  console.log('#### FAT SERVER IS RENDERING - ' + req.url + ' ####');

  const reactPart = renderToString(
    <Provider store={store}>
      <StaticRouter
      location={req.url}
      context={{}}>
        <App/>
      </StaticRouter>
    </Provider>
  );

  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fat Server Universal App</title>
        <link rel="icon" type="image/x-icon" href="/fat.ico" />
      </head>
      <body>
        <div id="app">${reactPart}</div>
        <script>
          window.__STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="/build.js"></script>
        <script type="text/javascript">
          initApp("${req.url}");
        </script>
      </body>
    </html>`);
};

// universal routing and rendering
app.get('/', async (req, res) => {
  const store = createStore(reducer.main);

  store.dispatch(reducer.actions.SET_PAGE(reducer.pages.MAIN));
  await reducer.asyncActions.fetchAccounts(store.dispatch);

  renderPage(req, res, store);
});

app.get('/account/:id',async (req, res) => {
  const store = createStore(reducer.main);

  store.dispatch(reducer.actions.SET_PAGE(reducer.pages.SUB));
  await reducer.asyncActions.fetchAccountFields(store.dispatch);
  await reducer.asyncActions.fetchAccount(req.params.id, store.dispatch);

  renderPage(req, res, store);
});


// start the server
const port = 3001;
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Fat Server running on http://localhost:${port}`);
  console.info(`
      ------
      | @ @ |
    ((       ))
    |    {}   |    FAT SERVER
    -----------
  ###############
 ##################
#@@ ########### @@#
#@@ ########### @@#
 #@@ ######### @@#
  ##@@ ##### @@##
  @@@@@@@@@@@@@@@@
  @@@@@      @@@@@
  @@@@       @@@@@
@@@@@@@@    @@@@@@@
    `);
});
