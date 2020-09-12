import * as express from 'express';
import { Picture, PictureCollection } from '../models/model';
import { authenticateJWT } from '../middlewares/authenticate';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

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
    .then(docs => {
      exec('jpegoptim --max=90 ' + path.join(__dirname, './../../../../pictures/public/*.jpg'), (err, stdout, stderr) => {
        if (err) {
          console.error(err)
        }
      });
      res.status(200).send(req.body)
    })
    .catch(err => res.status(500).send());
});

router.put('/:id', authenticateJWT, (req, res) => {
  PictureCollection.updateOne({ id: req.body.id }, req.body)
    .then(docs => res.status(200).send({ id: req.params.id, ...req.body }))
    .catch(err => res.status(500).send());
});

router.delete('/:id', authenticateJWT, (req, res) => {
  PictureCollection.findOne({ id: req.params.id }).lean()
    .then(doc => {
      const { _id, ...picture } = doc;
      fs.unlink(path.join(__dirname, './../../../../pictures/public/', (picture as Picture).url), function (err) {
        if (err) {
          res.status(500).send('Erreur lors de la suppression');
        } else {
          PictureCollection.deleteOne({ id: req.params.id })
            .then(docs => res.status(200).send())
            .catch(err => res.status(500).send());
        }
      })
    })
    .catch(err => res.status(500).send());
});

router.post('/postFile', authenticateJWT, (req: any, res) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).send("Opération non permise en développement");
  } else {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.peinture;

    sampleFile.mv(path.join(__dirname, './../../../../pictures/public/', sampleFile.name), err => {
      if (err) throw err;
      res.status(200).send('File uploaded!');
    });
  }
});


export default router;