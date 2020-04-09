import * as express from 'express';
import { db } from '../index';

const router = express.Router();

router.post('', (req, res) => {
  console.log(req.body);
  db.collection('paintings').doc(req.body.id).set(req.body.content)
    .then(doc => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

export default router;