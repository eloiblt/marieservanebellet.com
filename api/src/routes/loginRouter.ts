import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/constants';
import { User, UserCollection } from '../models/model'

const router = express.Router();

router.post('', (req, res) => {
  UserCollection.find({ mail: req.body.mail}).lean()
    .then(docs => {
      const users: User[] = docs.map(d => {
        const { _id, ...user } = d;
        return user as User;
      });
      if (docs.length === 1) {
        const user = users[0];
        bcrypt.compare(req.body.password, user.password)
          .then(rt => {
            if (rt) {
              const token = jwt.sign({ mail: user.mail, password: user.password }, jwtSecret, { expiresIn: '1h' });
              res.status(200).send({ user: this.user, token: this.token });
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