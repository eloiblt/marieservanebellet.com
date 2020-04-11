import * as express from 'express';
import { db } from '../index';
import { authenticateJWT } from '../middlewares/authenticate';

const router = express.Router();

router.get('/', (req, res) => {
  db.collection('paintings').get()
    .then(doc => {
      let array: any[] = [];
      doc.forEach(d => array = [...array, { id: d.id, ...d.data() }]);
      res.send(array)
    })
    .catch(err => res.sendStatus(500));
});

router.post('/', authenticateJWT, (req, res) => {
  const { id, ...content } = req.body;
  db.collection('paintings')
    .doc(id.toString())
    .set(content)
    .then(doc => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

router.put('/:id', authenticateJWT, (req, res) => {
  console.log('update');
  db.collection('paintings')
    .doc(req.params.id.toString())
    .update(req.body)
    .then(doc => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
});

export default router;