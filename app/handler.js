var debug = require('debug')('handler');
var spawn = require('child_process').spawn;

function doEncode(req, res, next) {

}

function doEncodeSimple(req, res, next) {
  debug('Params: %j', req.params);
  if (!req.params.name) {
    res.send(400, 'Name is missing.');
    next();
    return;
  }
  var file = req.params.name + '.png';
  var child = spawn('dmtxwrite');
  debug('Spawned child process');
  child.stdin.write(req.params.name, function(err) {
      debug('Written %j to stdin', req.params.name);
      child.stdin.destroy();
    });
  res.contentType = 'image/png';
  child.stdout.pipe(res);
  next();
}

function doDecode(req, res, next) {
  debug('Content-Type: %j', req.header('Content-Type'));
  if (!req.is('multipart/form-data')) {
    res.send(400, 'Format not supported. Use multipart/form-data');
    next();
    return;
  }
  debug('files', req.files);
  if (!req.files.image) {
    res.send(400, 'Missing file named image to decode.');
    next();
    return;
  }

  var file = req.files.image.path;
  debug('filepath %j', file);

  var result = '';
  var child = spawn('dmtxread', [file]);
  debug('Spawned child process');
  child.stdout.on('data', function(chunk) {
    debug('Got data %j', chunk.toString());
    result += chunk.toString();
  });
  child.stdout.on('end', function() {
    res.send(200, {res: result});
  });
  next();
}

exports.doEncode = doEncode;
exports.doEncodeSimple = doEncodeSimple;
exports.doDecode = doDecode;
