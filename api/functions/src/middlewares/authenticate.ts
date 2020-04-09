import * as jwt from "jsonwebtoken";
import * as constants from "../config/constants";
const jwtSecret = "1202";

export function authenticateJWT(req: any, res: any, next: any) {
  if (process.env.FUNCTIONS_EMULATOR) {
    next();
  } else {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
        if (err) {
          console.log('err ' + err);
          res.status(401).send();
        }
        next();
      });
    } else {
      if (req.get('origin') === constants.frontUrl) {
        console.log('je suis le front');
        const token = jwt.sign({ id: "front" }, jwtSecret, { expiresIn: '10 min' });
        res.send(token);
      }

      res.status(401).send();
    }
  }
}