import express from 'express';
import cors from 'cors';
import * as constants from './config/constants';
import fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
// import picturesRouter from './routes/picturesRouter';
// import loginRouter from './routes/loginRouter';
// import categoryPictures from './routes/categoryPaintingRouter';

const app = express();
app.use(express.json());

// Certificate
const privateKey = fs.readFileSync(path.join(__dirname, '../../../.certbot/config/live/marieservanebellet.com/privkey.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../../../.certbot/config/live/marieservanebellet.com/cert.pem'), 'utf8');
const ca = fs.readFileSync(path.join(__dirname, '../../../.certbot/config/live/marieservanebellet.com/chain.pem'), 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

if (process.env.NODE_ENV === "development") {
  console.log('Development environnement')
  app.use(cors()); // allow *
} else {
  app.use(cors({
    origin: constants.frontUrl,
    optionsSuccessStatus: 200
  })); // allow front only
}

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, () => {
  console.log('Server is listening on 3000');
});

// app.use('/login', loginRouter);
// app.use('/pictures', picturesRouter);
// app.use('/categoryPictures', categoryPictures);

app.get('/status', (req, res) => {
  res.send('Hello world !');
});
