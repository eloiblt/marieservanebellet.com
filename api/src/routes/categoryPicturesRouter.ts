import * as express from "express";
import { CategoryPictures, CategoryPicturesCollection } from "../models/model";
import { authenticateJWT } from "../middlewares/authenticate";
import { check, validationResult } from "express-validator";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  CategoryPicturesCollection.find()
    .lean()
    .then((docs) => {
      const categoryPictures: CategoryPictures[] = docs.map((d) => {
        const { _id, ...categoryPicture } = d;
        return categoryPicture as CategoryPictures;
      });
      res.status(200).send(categoryPictures);
    })
    .catch(() => res.status(500).send());
});

router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  await check("id").isInt().run(req);
  await check("name").isString().trim().escape().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  CategoryPicturesCollection.create(req.body)
    .then(() => res.status(200).send(req.body))
    .catch(() => res.status(500).send());
});

router.put("/:id", authenticateJWT, async (req: Request, res: Response) => {
  await check("id").isInt().run(req);
  await check("name").isString().trim().escape().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  CategoryPicturesCollection.updateOne({ id: req.body.id }, req.body)
    .then(() => res.status(200).send({ id: req.params.id, ...req.body }))
    .catch(() => res.status(500).send());
});

router.delete("/:id", authenticateJWT, (req: Request, res: Response) => {
  CategoryPicturesCollection.deleteOne({ id: req.params.id })
    .then(() => res.status(200).send())
    .catch(() => res.status(500).send());
});

export default router;
