"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_VAR_1 = require("../../SECRET_VAR");
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
                console.log(rt);
                if (rt) {
                    const token = jwt.sign({ mail: user.mail, password: user.password }, SECRET_VAR_1.jwtSecret, { expiresIn: '600' });
                    res.send({ user: user, token: token });
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
            res.sendStatus(401);
        }
    })
        .catch(err => {
        console.log(err);
        res.status(401).send();
    });
});
exports.default = router;
//# sourceMappingURL=loginRouter.js.map