import * as jwt from "jsonwebtoken";
import * as constants from "../config/constants";

export function authenticateJWT(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, constants.jwtSecret, (err: any, decoded: any) => {
      if (err) {
        console.log('err ' + err);
        res.status(401).send();
      }
      next();
    });
  } else {
    console.log('pas le header, dégage !')
    res.status(401).send();
  }
}