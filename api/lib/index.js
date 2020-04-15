"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const constants = require("./config/constants");
const picturesRouter_1 = require("./routes/picturesRouter");
const loginRouter_1 = require("./routes/loginRouter");
const categoryPaintingRouter_1 = require("./routes/categoryPaintingRouter");
// import { authenticateJWT } from './middlewares/authenticate'
admin.initializeApp({
    credential: admin.credential.cert(require('./config/firebase_admin_SDK.json')),
    databaseURL: constants.dataBaseUrl
});
const app = express();
app.use(express.json());
if (process.env.FUNCTIONS_EMULATOR) {
    console.log('Development environnement');
    app.use(cors()); // allow *
}
else {
    app.use(cors({
        origin: constants.frontUrl,
        optionsSuccessStatus: 200
    })); // allow front only
}
exports.db = admin.firestore();
exports.webApi = functions.region('europe-west1').https.onRequest(app);
exports.webApiEurope = functions.region('europe-west1').https.onRequest(app);
app.use('/login', loginRouter_1.default);
app.use('/pictures', picturesRouter_1.default);
app.use('/categoryPictures', categoryPaintingRouter_1.default);
app.get('/env', (req, res) => {
    res.send(constants);
});
//# sourceMappingURL=index.js.map