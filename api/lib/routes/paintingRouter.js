"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
const authenticate_1 = require("../middlewares/authenticate");
const router = express.Router();
router.get('/', (req, res) => {
    index_1.db.collection('paintings')
        .orderBy("categoryId")
        .get()
        .then(doc => {
        let array = [];
        doc.forEach(d => array = [...array, Object.assign({ id: parseInt(d.id, 10) }, d.data())]);
        res.status(200).send(array);
    })
        .catch(err => res.status(500).send());
});
router.post('/', authenticate_1.authenticateJWT, (req, res) => {
    const _a = req.body, { id } = _a, content = __rest(_a, ["id"]);
    index_1.db.collection('paintings')
        .doc(id.toString())
        .set(content)
        .then(doc => res.status(200).send(req.body))
        .catch(err => res.status(500).send());
});
router.put('/:id', authenticate_1.authenticateJWT, (req, res) => {
    console.log('update');
    index_1.db.collection('paintings')
        .doc(req.params.id.toString())
        .update(req.body)
        .then(doc => res.status(200).send(Object.assign({ id: req.params.id }, req.body)))
        .catch(err => res.status(500).send());
});
exports.default = router;
//# sourceMappingURL=paintingRouter.js.map