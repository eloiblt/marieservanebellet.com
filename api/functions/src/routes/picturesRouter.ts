import * as express from 'express';
import { db } from '../index';
import { authenticateJWT } from '../middlewares/authenticate';
import { Picture } from '../models/model';

const router = express.Router();

router.get('/', (req, res) => {
  db.collection('pictures')
    .orderBy("categoryId")
    .get()
    .then(doc => {
      let array: any[] = [];
      doc.forEach(d => array = [...array, { id: parseInt(d.id, 10), ...d.data() } as Picture]);
      res.status(200).send(array)
    })
    .catch(err => res.status(500).send());
});

router.post('/', authenticateJWT, (req, res) => {
  const { id, ...content } = req.body;
  db.collection('pictures')
    .doc(id.toString())
    .set(content)
    .then(doc => res.status(200).send(req.body))
    .catch(err => res.status(500).send());
});

router.put('/:id', authenticateJWT, (req, res) => {
  db.collection('pictures')
    .doc(req.params.id.toString())
    .update(req.body)
    .then(doc => res.status(200).send({ id: req.params.id, ...req.body }))
    .catch(err => res.status(500).send());
});

router.delete('/:id', authenticateJWT, (req, res) => {
  db.collection('pictures')
    .doc(req.params.id.toString())
    .delete()
    .then(doc => res.status(200).send())
    .catch(err => res.status(500).send());
});

export default router;