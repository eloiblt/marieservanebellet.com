"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
const router = express.Router();
router.post('', (req, res) => {
    index_1.db.collection('paintings').doc(req.body.id).set(req.body.content)
        .then(doc => res.sendStatus(200))
        .catch(err => res.sendStatus(500));
});
router.get('', (req, res) => {
    console.log(req.get('origin'));
    index_1.db.collection('paintings').get()
        .then(doc => {
        let array = [];
        doc.forEach(d => array = [...array, Object.assign({ id: d.id }, d.data())]);
        res.send(array);
    })
        .catch(err => res.sendStatus(500));
});
exports.default = router;
//# sourceMappingURL=paintingRouter.js.map