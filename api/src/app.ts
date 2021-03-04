import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import helmet from 'helmet';
import * as http from 'http';
import * as https from 'https';
import mongoose from 'mongoose';
import * as path from 'path';
import * as dotenv from "dotenv";
dotenv.config();
import * as constants from './config/constants';
import categoryPicturesRouter from './routes/categoryPicturesRouter';
import contactRouter from './routes/contactRouter';
import loginRouter from './routes/loginRouter';
import picturesRouter from './routes/picturesRouter';
import fileupload from 'express-fileupload';

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
app.use(helmet());
app.use(rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 300 // limit each IP to 100 requests per windowMs
}));
app.use(fileupload());

if (process.env.NODE_ENV === "development") {
  console.log('Development environnement');

  app.use(cors()); // allow *

  const httpServer = http.createServer(app);
  httpServer.listen(3000, () => {
    console.log('HTTP Server is listening on 3000');
  });
} else if (process.env.NODE_ENV === "production") {
  app.use(cors({
    origin: constants.frontUrl,
    optionsSuccessStatus: 200
  })); // allow front only

  // Certificate
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/marieservanebellet.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/marieservanebellet.com/cert.pem', 'utf8');
  const chain = fs.readFileSync('/etc/letsencrypt/live/marieservanebellet.com/chain.pem', 'utf8');

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
app.use('/categoryPictures', categoryPicturesRouter);
app.use('/contact', contactRouter);

app.get('/status', (req, res) => {
  res.send('API ON');
});
