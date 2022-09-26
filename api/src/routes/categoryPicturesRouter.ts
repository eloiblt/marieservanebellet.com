import * as express from "express";
import { CategoryPictures, CategoryPicturesCollection } from "../models/model";
import { authenticateJWT } from "../middlewares/authenticate";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.get("/", (req, res) => {
  CategoryPicturesCollection.find()
    .lean()
    .then((docs) => {
      const categoryPictures: CategoryPictures[] = docs.map((d) => {
        const { _id, ...categoryPicture } = d;
        return categoryPicture as CategoryPictures;
      });
      res.status(200).send(categoryPictures);
    })
    .catch((err) => res.status(500).send());
});

router.post(
  "/",
  authenticateJWT,
  body("id").isInt(),
  body("name").isString(),
  body("show").isBoolean(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // const categoryPictures: CategoryPictures = {
    //   id: req.body.id,
    //   name: req.body.name,
    //   show: req.body.show
    // } as CategoryPictures;


    CategoryPicturesCollection.create(req.body)
      .then((docs) => res.status(200).send(req.body))
      .catch((err) => res.status(500).send());
  }
);

router.put("/:id", authenticateJWT, (req, res) => {
  const categoryPictures: CategoryPictures = {
    id: req.body.id,
    name: req.body.name,
    show: req.body.show,
  } as CategoryPictures;

  CategoryPicturesCollection.updateOne(
    { id: categoryPictures.id },
    categoryPictures
  )
    .then((docs) =>
      res.status(200).send({ id: req.params.id, ...categoryPictures })
    )
    .catch((err) => res.status(500).send());
});

router.delete("/:id", authenticateJWT, (req, res) => {
  CategoryPicturesCollection.deleteOne({ id: req.params.id })
    .then((docs) => res.status(200).send())
    .catch((err) => res.status(500).send());
});

export default router;
