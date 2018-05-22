// var fs = require('fs');
var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

// https://www.npmjs.com/package/express-http-proxy | http-proxy-middleware
var proxy = require('http-proxy-middleware');
var cors = require('cors');

// var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

app.use(cors());
// -test app.use((req, res)=>res.json({ok:true}));
app.use('*', proxy({target: 'http://admincore:8081', changeOrigin: true})); // internal networking 

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

httpServer.listen( process.env.PORT || 8585, () => {
    console.log('Listening');
});
// httpsServer.listen(8443);