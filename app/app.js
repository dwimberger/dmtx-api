var debug = require('debug')('app');
var moment = require('moment');
var restify = require('restify');
var handler = require('./handler');

var SERVER_PORT = 8080;

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.acceptParser(server.acceptable));

server.post('/dmtx', handler.doDecode);
server.get('/dmtx/:name', handler.doEncodeSimple);

server.listen(SERVER_PORT, function() {
  console.log(
    '%s listening at %s since %j', server.name, server.url,
    moment().toString()
  );
});
