import * as express from 'express';
import { db } from '../index';

const router = express.Router();

router.post('', (req, res) => {
  db.collection('paintings').doc(req.body.id).set(req.body.content)
    .then(doc => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

router.get('', (req, res) => {
  console.log(req.get('origin'));
  db.collection('paintings').get()
    .then(doc => {
      let array: any[] = [];
      doc.forEach(d => array = [...array, { id: d.id, ...d.data() }]);
      res.send(array)
    })
    .catch(err => res.sendStatus(500));
});

export default router;