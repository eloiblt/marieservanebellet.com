const fs = require('fs');
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

// www redirect
app.use((req, res, next) => {
  if (req.headers.host.slice(0, 4) === 'www.') {
    var newHost = req.headers.host.slice(4);
    return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
  }
  next();
});

app.use(express.static(__dirname + '/dist'));

app.get('*', function (req, res, next) {
  res.sendFile(__dirname + '/dist/index.html');
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});