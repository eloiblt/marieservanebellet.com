import * as express from 'express';
import { body, validationResult } from 'express-validator';
import * as nodeMailer from 'nodemailer';
import { Request, Response } from "express";

const router = express.Router();

router.post('/', [
  body('name').not().isEmpty().trim().escape().isLength({ min: 3 }),
  body('mail').not().isEmpty().isEmail().normalizeEmail().escape(),
  body('message').not().isEmpty().trim().escape()
],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    req.body.message = req.body.message.replace(/&#x27;/g, '\'').replace(/&quot;/g, '\"');

    let transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_TLS === 'true' ? true : false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'marieservanebellet.site@gmail.com',
      to: process.env.MAIL_TO,
      bcc: process.env.MAIL_BCC,
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