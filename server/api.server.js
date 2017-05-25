// src/api.server.js
// API SERVER
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import request from 'request';
import queryString from 'query-string';

import credentials from './_credentials';
import urls from './_urls';
const httpHeader = {'Content-Type': 'application/x-www-form-urlencoded'};
const accessHeader = (access_token) => Object.assign({}, httpHeader, {'Authorization': 'Bearer ' + access_token});

const app = new Express();
const server = new Server(app);

function getToken() {
  console.log('Token generation');
  return new Promise(resolve => request.post({
    url:urls.token,
    headers: httpHeader,
    body: queryString.stringify(credentials)
    }, (e, r, body) => {
      resolve(JSON.parse(body).access_token); // token
    })
  );
};

function getAccountList(token) {
  console.log('Get accounts list');
  return new Promise(resolve => request({
    url: urls.accountList,
    headers: accessHeader(token)
  }, (e, r, body) => {
    resolve(JSON.parse(body)); //list
  })
  );
};

function getAccount(token, id) {
  console.log('Get account ' + id);
  return new Promise(resolve => request({
    url: urls.accountDetails(id),
    headers: accessHeader(token)
  }, (e, r, body) => {
    resolve(JSON.parse(body)); //list
  })
  );
};

function getAccountOptions(token) {
  console.log('Get properties of Account Object');
  return new Promise(resolve => request({
    url: urls.accountOptions,
    headers: accessHeader(token)
  }, (e, r, body) => {
    resolve(JSON.parse(body).fields); //list
  })
  );
};


async function init() {
  // INIT BY GETTING ACCESS TOKEN
  const token = await getToken();

  // Add headers
  app.use(function (req, res, next) {
      // Allow to connect from browser
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
  });

  // routing declaration
  app.get('/accounts', (req, res) => getAccountList(token).then(result => res.status(200).send(result)));
  app.get('/accounts/:id', (req, res) => getAccount(token, req.params.id).then(result => res.status(200).send(result)));
  app.get('/fields', (req, res) => getAccountOptions(token).then(result => res.status(200).send(result)));

  // start the server
  const port = 3003;
  server.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    console.info(`API Server running on http://localhost:${port}`);
  });

};

init();
