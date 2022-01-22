import * as jwt from "jsonwebtoken";

export function authenticateJWT(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        console.log('err ' + err);
        res.status(401).send();
      }
      next();
    });
  } else {
    console.log('Unauthorized tentative');
    res.status(401).send();
  }
}