'use strict';

var HttpClient = require('../').HttpClient;
var Agent = require('agentkeepalive');
var HttpsAgent = require('agentkeepalive').HttpsAgent;

tryHttpclient(HttpClient, 'urllib1');
// tryHttpclient(HttpClient2, 'urllib2');

function tryHttpclient(HttpClient, name) {
  var options = {
    method: 'HEAD',
    timeout: 10000,
  };
  var agent = new Agent({
    timeout: 60000,
    freeSocketKeepAliveTimeout: 30000,
  });
  var httpsAgent = new HttpsAgent({
    timeout: 60000,
    freeSocketKeepAliveTimeout: 30000,
  });
  var urllib = new HttpClient({ agent: agent, httpsAgent: httpsAgent });
  urllib.on('response', function(info) {
    console.log(name, agent, agent.getCurrentStatus());
    console.log(name, httpsAgent, httpsAgent.getCurrentStatus());
    console.log(name, info.res.keepAliveSocket);
  });
  urllib.request('http://nodejs.org', options)
  .then(function() {
    return urllib.request('http://nodejs.org', options);
  })
  .then(function() {
    return urllib.request('http://nodejs.org', options);
  })
  .catch(function(err) { console.log(err); });
}
