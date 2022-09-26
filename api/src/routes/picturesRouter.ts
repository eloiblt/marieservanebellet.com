import * as express from 'express';
import { Picture, PictureCollection } from '../models/model';
import { authenticateJWT } from '../middlewares/authenticate';
import * as fs from 'fs';
import { exec } from 'child_process';
import { Request, Response } from "express";
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
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

router.get('/getBySpec', async (req: Request, res: Response) => {
  await check("spec").isString().trim().escape().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

router.get('/getByCategory', async (req: Request, res: Response) => {
  await check("categoryId").isInt().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

router.post('/', authenticateJWT, async (req: Request, res: Response) => {
  await check("categoryId").isInt().run(req);
  await check("date").isString().trim().run(req);
  await check("gridColumn").isString().trim().run(req);
  await check("gridrow").isString().trim().run(req);
  await check("id").isInt().trim().run(req);
  await check("size").isString().trim().run(req);
  await check("technique").isString().trim().run(req);
  await check("title").isString().trim().run(req);
  await check("url").isString().trim().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  PictureCollection.create(req.body)
    .then(docs => res.status(200).send(req.body))
    .catch(err => res.status(500).send());
});

router.put('/:id', authenticateJWT, async (req: Request, res: Response) => {
  await check("categoryId").isInt().run(req);
  await check("date").isString().trim().run(req);
  await check("gridColumn").isString().trim().run(req);
  await check("gridrow").isString().trim().run(req);
  await check("id").isInt().trim().run(req);
  await check("size").isString().trim().run(req);
  await check("technique").isString().trim().run(req);
  await check("title").isString().trim().run(req);
  await check("url").isString().trim().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  PictureCollection.updateOne({ id: req.body.id }, req.body)
    .then(docs => res.status(200).send({ id: req.params.id, ...req.body }))
    .catch(err => res.status(500).send());
});

router.delete('/:id', authenticateJWT, async (req: Request, res: Response) => {
  await check("id").isInt().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  PictureCollection.findOne({ id: req.params.id }).lean()
    .then(doc => {
      const { _id, ...picture } = doc;
      fs.unlink('/usr/share/nginx/html/' + (picture as Picture).url, function (err) {
        PictureCollection.deleteOne({ id: req.params.id })
          .then(docs => res.status(200).send())
          .catch(err => res.status(500).send());
      })
    })
    .catch(err => res.status(500).send());
});

router.post('/postFile', authenticateJWT, (req: any, res: Response) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).send("Opération non permise en développement");
  } else {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.peinture;

    sampleFile.mv('/pictures/' + sampleFile.name, err => {
      if (err) throw err;
      exec('jpegoptim --max=50 --strip-all /pictures/' + sampleFile.name, (err, stdout, stderr) => {
        if (err) {
          console.error(err)
        }
        res.status(200).send('File uploaded!');
      });
    });
  }
});

export default router;