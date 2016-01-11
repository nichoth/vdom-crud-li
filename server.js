var http = require('http'),
    ecstatic = require('ecstatic');

http.createServer(
  ecstatic({ root: __dirname + '/example' })
).listen(8000);

console.log('Listening on :8000');
