import express from 'express';
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import * as constants from './config/constants';
import picturesRouter from './routes/picturesRouter';
import loginRouter from './routes/loginRouter';
import categoryPictures from './routes/categoryPicturesRouter';

// DB connection
mongoose.connect(constants.dataBaseUrl, {
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => console.log('Error during the database sconnection'));
db.once('connected', () => console.log("Connected to database"));

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  console.log('Development environnement');

  app.use(cors()); // allow *

  const httpServer = http.createServer(app);
  httpServer.listen(3000, () => {
    console.log('HTTP Server is listening on 3000');
  });
} else {
  app.use(cors({
    origin: constants.frontUrl,
    optionsSuccessStatus: 200
  })); // allow front only

  // Certificate
  const privateKey = fs.readFileSync(path.join(__dirname, '../../../.certbot/config/live/marieservanebellet.com/privkey.pem'), 'utf8');
  const certificate = fs.readFileSync(path.join(__dirname, '../../../.certbot/config/live/marieservanebellet.com/cert.pem'), 'utf8');
  const chain = fs.readFileSync(path.join(__dirname, '../../../.certbot/config/live/marieservanebellet.com/chain.pem'), 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: chain
  };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(3000, () => {
    console.log('HTTPS Server is listening on 3000');
  });
}

app.use('/login', loginRouter);
app.use('/pictures', picturesRouter);
app.use('/categoryPictures', categoryPictures);

app.get('/status', (req, res) => {
  res.send('Hello world !');
});
