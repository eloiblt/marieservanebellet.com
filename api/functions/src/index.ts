import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as constants from './config/constants';

console.log(constants);

admin.initializeApp({
  credential: admin.credential.cert(require('../admin.json')),
  databaseURL: constants.dataBaseUrl
});
const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(cors(constants.corsOptions));

export const webApi = functions.https.onRequest(app);

app.get('/warmup', (request, response) => {
  response.send('Warming up friend.');
});

app.get('/env', (request, response) => {
  response.send(constants);
});

app.get('/a', (request, response) => {
  db.collection('peintures').get().then((querySnapshot) => {
    let array: any[] = [];
    querySnapshot.forEach((doc) => {
      array = [...array, { id: doc.id, obj: doc.data() }];
    });
    response.send(array);
  }, err => console.log(err));
});
