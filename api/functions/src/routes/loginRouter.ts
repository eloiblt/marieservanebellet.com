import * as express from 'express';
import { db } from '../index';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/model';
import { jwtSecret } from '../config/constants';

const router = express.Router();

router.post('', (req, res) => {
  db.collection('users')
    .where("mail", "==", req.body.mail)
    .get()
    .then(doc => {
      let array: any[] = [];
      doc.forEach(d => array = [...array, { id: d.id, ...d.data() }]);
      if (array.length === 1) {
        const user = array[0] as User;
        bcrypt.compare(req.body.password, user.password)
          .then(rt => {
            if (rt) {
              const token = jwt.sign({ mail: user.mail, password: user.password }, jwtSecret, { expiresIn: '1h' });
              res.status(200).send({ user: user, token: token });
            } else {
              res.status(401).send();
            }
          })
          .catch(err => {
            console.log(err);
            res.status(401).send();
          });
      } else {
        res.sendStatus(401);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(401).send();
    });
});

export default router;