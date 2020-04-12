import * as express from 'express';
import { db } from '../index';
import { CategoryPictures } from '../models/model';

const router = express.Router();

router.get('/', (req, res) => {
  db.collection('categoryPictures')
    .get()
    .then(doc => {
      let array: any[] = [];
      doc.forEach(d => array = [...array, { id: parseInt(d.id, 10), ...d.data() } as CategoryPictures]);
      res.status(200).send(array)
    })
    .catch(err => res.status(500).send());
});

export default router;