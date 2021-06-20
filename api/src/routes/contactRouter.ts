import * as express from 'express';
import { body, validationResult } from 'express-validator';
import * as nodeMailer from 'nodemailer';
import * as constants from '../config/constants';

const router = express.Router();

router.post('/', [
  body('name').not().isEmpty().trim().escape().isLength({ min: 3 }),
  body('mail').not().isEmpty().isEmail().normalizeEmail().escape(),
  body('message').not().isEmpty().trim().escape()
],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    req.body.message = req.body.message.replace(/&#x27;/g, '\'').replace(/&quot;/g, '\"');

    let transporter = nodeMailer.createTransport({
      host: "in-v3.mailjet.com:",
      port: 465,
      secure: true,
      auth: {
        user: constants.smtpUser,
        pass: constants.smtpPassword,
      },
    });

    const mailOptions = {
      from: 'marieservanebellet.site@gmail.com',
      to: constants.mailTo,
      bcc: constants.mailBcc,
      subject: 'Nouveau mail reçu de ' + req.body.name + ', <' + req.body.mail + '>',
      text: req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send();
      }
      res.status(200).send();
    });
  });

export default router;