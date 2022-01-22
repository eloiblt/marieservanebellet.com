import cors from 'cors';
import * as dotenv from "dotenv";

if (process.env.NODE_ENV?.trim() === 'development') {
  dotenv.config();
}

import express from 'express';
import fileupload from 'express-fileupload';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as http from 'http';
import mongoose from 'mongoose';
import categoryPicturesRouter from './routes/categoryPicturesRouter';
import contactRouter from './routes/contactRouter';
import loginRouter from './routes/loginRouter';
import picturesRouter from './routes/picturesRouter';

mongoose.connect(process.env.DATABASE_URL, {
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', () => console.log('Error during the database connection'));
db.once('connected', () => console.log("Connected to database"));

const app = express();
app.use(express.json());
app.use(helmet());
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 300 }));
app.use(fileupload());

let port: number;
if (process.env.NODE_ENV === "production") {
  console.log('Production environnement');

  app.use(cors({
    origin: process.env.FRONT_URL,
    optionsSuccessStatus: 200
  }));

  port = 80;
} else {
  console.log('Development environnement');
  app.use(cors());
  port = 3000;
}

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log(`HTTP Server is listening on port ${port}`);
});

app.use('/login', loginRouter);
app.use('/pictures', picturesRouter);
app.use('/categoryPictures', categoryPicturesRouter);
app.use('/contact', contactRouter);

app.get('/status', (req, res) => {
  res.send('API ON');
});
