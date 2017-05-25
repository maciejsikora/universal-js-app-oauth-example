// src/server.js
// THIN SERVER

import path from 'path';
import { Server } from 'http';
import Express from 'express';

// initialize the server
const app = new Express();
const server = new Server(app);

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, '../dist')));

// render static html file
app.get('*', (req, res) => {
      console.log('--- THIN SERVER IS RENDERING - ' + req.url + ' ---');

      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Thin Server Universal App</title>
            <link rel="icon" type="image/x-icon" href="/thin.ico" />
          </head>
          <body>
            <div id="app"></div>
            <script type="text/javascript" src="/build.js"></script>
            <script type="text/javascript" type="text/javascript">initApp('/')</script>
          </body>
        </html>`);
});

// start the server
const port = 3000;
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Thin Server running on http://localhost:${port}`);
  console.info(`
         ------
         | @@ |
         |    |
         | {} |  THIN SERVER
           ||
          ####
         @####@
        @ #### @
        @ #### @
        @  ##  @
         %%%%%
         %   %
         %   $
         %   %
        ##   ##
    `);
});
