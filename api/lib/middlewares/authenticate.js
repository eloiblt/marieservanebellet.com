"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const constants = require("../config/constants");
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, constants.jwtSecret, (err, decoded) => {
            if (err) {
                console.log('err ' + err);
                res.status(401).send();
            }
            next();
        });
    }
    else {
        console.log('pas le header, dégage !');
        res.status(401).send();
    }
}
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authenticate.js.map