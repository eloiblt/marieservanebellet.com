import * as express from 'express';
import { CategoryPictures, CategoryPicturesCollection } from '../models/model';

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

export default router;