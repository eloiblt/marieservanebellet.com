import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";


admin.initializeApp({
  credential: admin.credential.cert(require("../admin.json")),
  databaseURL: "https://marieservanebellet-api.firebaseio.com"
});
const db = admin.firestore();

const app = express();

app.use(bodyParser.json());

export const webApi = functions.https.onRequest(app);

app.get('/warmup', (request, response) => {
  response.send('Warming up friend.');
});

app.get('/helllo', (request, response) => {
  response.send('Warming up friend.');
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
