import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as constants from './config/constants';
import paintingRouter from './routes/paintingRouter';

admin.initializeApp({
  credential: admin.credential.cert(require('../admin.json')),
  databaseURL: constants.dataBaseUrl
});

const app = express();
app.use(express.json());

if (process.env.FUNCTIONS_EMULATOR) {
  app.use(cors()); // allow *
} else {
  app.use(cors(constants.corsOptions)); // allow front only
}

export const db = admin.firestore();
export const webApi = functions.https.onRequest(app);

app.use('/paintings', paintingRouter);

app.get('/env', (req, res) => {
  res.send(constants);
});
