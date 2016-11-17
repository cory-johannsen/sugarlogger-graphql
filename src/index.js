// index.js
// by requiring `babel/register`, all of our successive `require`s will be Babel'd
require('newrelic');
require('babel-core/register');
require('./server.js');
