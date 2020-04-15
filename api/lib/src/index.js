"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const constants = require("./config/constants");
const SECRET_VAR_1 = require("../SECRET_VAR");
const paintingRouter_1 = require("./routes/paintingRouter");
const loginRouter_1 = require("./routes/loginRouter");
// import { authenticateJWT } from './middlewares/authenticate'
admin.initializeApp({
    credential: admin.credential.cert(JSON.stringify(SECRET_VAR_1.dbCredential)),
    databaseURL: constants.dataBaseUrl
});
const app = express();
app.use(express.json());
if (process.env.FUNCTIONS_EMULATOR) {
    console.log('Development environnement');
    app.use(cors()); // allow *
}
else {
    app.use(cors(constants.corsOptions)); // allow front only
}
exports.db = admin.firestore();
exports.webApi = functions.https.onRequest(app);
app.use('/login', loginRouter_1.default);
app.use('/paintings', paintingRouter_1.default);
app.get('/env', (req, res) => {
    res.send(constants);
});
//# sourceMappingURL=index.js.map