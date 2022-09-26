import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserCollection } from '../models/model'
import { Request, Response } from "express";
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post('', async (req: Request, res: Response) => {
  await check("mail").isString().trim().escape().isEmail().run(req);
  await check("password").isString().trim().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  UserCollection.find({ mail: req.body.mail}).lean()
    .then(docs => {
      const users: User[] = docs.map(d => {
        const { _id, ...user } = d;
        return user as User;
      });
      if (docs.length === 1) {
        const currentUser = users[0];
        bcrypt.compare(req.body.password, currentUser.password)
          .then(rt => {
            if (rt) {
              const newToken = jwt.sign({ mail: currentUser.mail, password: currentUser.password }, process.env.JWT_SECRET, { expiresIn: '1h' });
              res.status(200).send({ user: currentUser, token: newToken });
            } else {
              res.status(401).send();
            }
          })
          .catch(err => {
            console.log(err);
            res.status(401).send();
          });
      } else {
        res.status(401).send();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(401).send();
    });
});

export default router;