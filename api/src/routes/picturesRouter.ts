import * as express from 'express';
import { Picture, PictureCollection } from '../models/model';
import { authenticateJWT } from '../middlewares/authenticate';
import * as path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  PictureCollection.find().sort('categoryId').lean()
    .then(docs => {
      const pictures: Picture[] = docs.map(d => {
        const { _id, ...picture } = d;
        return picture as Picture;
      });
      res.status(200).send(pictures);
    })
    .catch(err => res.status(500).send());
});

router.get('/getBySpec', (req, res) => {
  PictureCollection.find({ spec: req.query.spec }).lean()
    .then(docs => {
      const pictures: Picture[] = docs.map(d => {
        const { _id, ...picture } = d;
        return picture as Picture;
      });
      res.status(200).send(pictures);
    })
    .catch(err => res.status(500).send());
});

router.get('/getByCategory', (req, res) => {
  PictureCollection.find({ categoryId: req.query.categoryId }).lean()
    .then(docs => {
      const pictures = docs.map(d => {
        const { _id, ...picture } = d;
        return picture as Picture;
      });
      res.status(200).send(pictures);
    })
    .catch(err => res.status(500).send());
});

router.post('/', authenticateJWT, (req, res) => {
  PictureCollection.create(req.body)
    .then(docs => res.status(200).send(req.body))
    .catch(err => res.status(500).send());
});

router.put('/:id', authenticateJWT, (req, res) => {
  PictureCollection.updateOne({ id: req.body.id }, req.body)
    .then(docs => res.status(200).send({ id: req.params.id, ...req.body }))
    .catch(err => res.status(500).send());
});

router.delete('/:id', authenticateJWT, (req, res) => {
  PictureCollection.deleteOne({ id: req.params.id })
    .then(docs => res.status(200).send())
    .catch(err => res.status(500).send());
});

router.post('/peinture', authenticateJWT, (req: any, res) => {
  if (process.env.NODE_ENV === "development") {
    res.send("Opération non permise en développement");
  } else {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.peinture;

    sampleFile.mv(path.join(__dirname, './../../../../pictures/public/', sampleFile.name), err => {
      if (err) throw err;
      res.send('File uploaded!');
    });
  }
});


export default router;