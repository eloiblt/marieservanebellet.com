const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();
app.use(express.json());

// Certificate
const privateKey = fs.readFileSync('../../.certbot/config/live/marieservanebellet.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('../../.certbot/config/live/marieservanebellet.com/cert.pem', 'utf8');
const ca = fs.readFileSync('../../.certbot/config/live/marieservanebellet.com/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res, next) {
  res.sendfile(__dirname + '/dist/index.html');
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});