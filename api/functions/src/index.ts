import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as constants from './config/constants';
import paintingRouter from './routes/paintingRouter';
import loginRouter from './routes/loginRouter';
// import { authenticateJWT } from './middlewares/authenticate'

admin.initializeApp({
  credential: admin.credential.cert(require('./config/firebase_admin_SDK.json')),
  databaseURL: constants.dataBaseUrl
});

const app = express();
app.use(express.json());

if (process.env.FUNCTIONS_EMULATOR) {
  console.log('Development environnement')
  app.use(cors()); // allow *
} else {
  app.use(cors({
    origin: constants.frontUrl,
    optionsSuccessStatus: 200
  })); // allow front only
}

export const db = admin.firestore();
export const webApi = functions.https.onRequest(app);

app.use('/login', loginRouter);
app.use('/paintings', paintingRouter);

app.get('/env', (req, res) => {
  res.send(constants);
});
