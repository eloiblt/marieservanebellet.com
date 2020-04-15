const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/front/index.html'));
});

app.listen(80, () => console.log('Listening on port 80 !'));