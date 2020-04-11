import * as express from 'express';
import { db } from '../index';
import { authenticateJWT } from '../middlewares/authenticate';
import { Painting } from '../models/model';

const router = express.Router();

router.get('/', (req, res) => {
  db.collection('paintings')
    .orderBy("categoryId")
    .get()
    .then(doc => {
      let array: any[] = [];
      doc.forEach(d => array = [...array, { id: parseInt(d.id, 10), ...d.data() } as Painting]);
      res.status(200).send(array)
    })
    .catch(err => res.status(500).send());
});

router.post('/', authenticateJWT, (req, res) => {
  const { id, ...content } = req.body;
  db.collection('paintings')
    .doc(id.toString())
    .set(content)
    .then(doc => res.status(200).send(req.body))
    .catch(err => res.status(500).send());
});

router.put('/:id', authenticateJWT, (req, res) => {
  console.log('update');
  db.collection('paintings')
    .doc(req.params.id.toString())
    .update(req.body)
    .then(doc => res.status(200).send({ id: req.params.id, ...req.body }))
    .catch(err => res.status(500).send());
});

export default router;