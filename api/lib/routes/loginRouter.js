"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constants_1 = require("../config/constants");
const router = express.Router();
router.post('', (req, res) => {
    index_1.db.collection('users')
        .where("mail", "==", req.body.mail)
        .get()
        .then(doc => {
        let array = [];
        doc.forEach(d => array = [...array, Object.assign({ id: d.id }, d.data())]);
        if (array.length === 1) {
            const user = array[0];
            bcrypt.compare(req.body.password, user.password)
                .then(rt => {
                if (rt) {
                    const token = jwt.sign({ mail: user.mail, password: user.password }, constants_1.jwtSecret, { expiresIn: '1h' });
                    res.status(200).send({ user: user, token: token });
                }
                else {
                    res.status(401).send();
                }
            })
                .catch(err => {
                console.log(err);
                res.status(401).send();
            });
        }
        else {
            res.status(401).send();
        }
    })
        .catch(err => {
        console.log(err);
        res.status(401).send();
    });
});
exports.default = router;
//# sourceMappingURL=loginRouter.js.map