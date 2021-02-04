import * as express from 'express';
import { CategoryPictures, CategoryPicturesCollection } from '../models/model';
import { authenticateJWT } from '../middlewares/authenticate';

const router = express.Router();

router.get('/', (req, res) => {
  CategoryPicturesCollection.find().lean()
    .then(docs => {
      const categoryPictures: CategoryPictures[] = docs.map(d => {
        const { _id, ...categoryPicture } = d;
        return categoryPicture as CategoryPictures;
      });
      res.status(200).send(categoryPictures);
    })
    .catch(err => res.status(500).send());
});

router.post('/', authenticateJWT, (req, res) => {
  CategoryPicturesCollection.create(req.body)
    .then(docs => res.status(200).send(req.body))
    .catch(err => res.status(500).send());
});

router.put('/:id', authenticateJWT, (req, res) => {
  CategoryPicturesCollection.updateOne({ id: req.body.id }, req.body)
    .then(docs => res.status(200).send({ id: req.params.id, ...req.body }))
    .catch(err => res.status(500).send());
});

router.delete('/:id', authenticateJWT, (req, res) => {
  CategoryPicturesCollection.deleteOne({ id: req.params.id })
    .then(docs => res.status(200).send())
    .catch(err => res.status(500).send());
});

export default router;