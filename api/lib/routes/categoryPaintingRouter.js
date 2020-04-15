"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
const router = express.Router();
router.get('/', (req, res) => {
    index_1.db.collection('categoryPictures')
        .get()
        .then(doc => {
        let array = [];
        doc.forEach(d => array = [...array, Object.assign({ id: parseInt(d.id, 10) }, d.data())]);
        res.status(200).send(array);
    })
        .catch(err => res.status(500).send());
});
exports.default = router;
//# sourceMappingURL=categoryPaintingRouter.js.map