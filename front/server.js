const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist'));
app.listen(80, () => console.log('Listening on port 80 !'));