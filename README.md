# universal-js-app-oauth-example
Example Universal Application Connected to Rest API and Oauth third party

## 1. Install the app
In root app directory call: 

```
  npm install
```
## 2. Configure OAUTH urls and access
Project was adjusted to **SalesForce** REST API but can be adjusted also to different source of data. To files needs to be renamed and changed:

```
 server/_urls.example.js -> rename to -> server/_urls.js
 server/_credentials.example.js -> rename to -> server/_credentials.js
```

In both cases paramaters inside config files needs to be updated to Your configiration.

## 3. Run servers

```
  npm run api-server // runs api server
  npm run fat-server // runs server with server side rendering
  npm run thin-server // runs server with only static resources
```

## 4. Open in browser

```
  localhost:3001 // fat server 
  localhost:3000 // thin server
```
