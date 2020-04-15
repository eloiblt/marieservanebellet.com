"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const constants = __importStar(require("../config/constants"));
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