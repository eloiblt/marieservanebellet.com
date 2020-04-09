import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as constants from './config/constants';
import paintingRouter from './routes/paintingRouter';
import { authenticateJWT } from './middlewares/authenticate'

admin.initializeApp({
  credential: admin.credential.cert(require('../admin.json')),
  databaseURL: constants.dataBaseUrl
});

const app = express();
app.use(express.json());

let authenticate;
if (process.env.FUNCTIONS_EMULATOR) {
  console.log('Development environnement')
  app.use(cors()); // allow *
  authenticate = (req: any, res: any, next: any) => next();
} else {
  app.use(cors(constants.corsOptions)); // allow front only
  authenticate = authenticateJWT;
}

export const db = admin.firestore();
export const webApi = functions.https.onRequest(app);

app.use('/paintings', authenticate, paintingRouter);

app.get('/env', (req, res) => {
  res.send(constants);
});
