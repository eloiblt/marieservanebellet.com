import express from 'express';
import cors from 'cors';
import * as constants from './config/constants';
// import picturesRouter from './routes/picturesRouter';
// import loginRouter from './routes/loginRouter';
// import categoryPictures from './routes/categoryPaintingRouter';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  console.log('Development environnement')
  app.use(cors()); // allow *
} else {
  app.use(cors({
    origin: constants.frontUrl,
    optionsSuccessStatus: 200
  })); // allow front only
}

app.listen(3000, err => {
  return console.log('server is listening on 3000');
});

// app.use('/login', loginRouter);
// app.use('/pictures', picturesRouter);
// app.use('/categoryPictures', categoryPictures);

app.get('/env', (req, res) => {
  res.send(constants);
});
