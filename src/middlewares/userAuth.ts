import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userAuth = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken === '' || authToken === undefined) {
    return res.sendStatus(403);
  }

  const bearer = authToken.split(' ');
  const auth = bearer[1];

  if (auth === undefined) {
    res.sendStatus(403);
  } else {
    try {
      const data = jwt.verify(auth, process.env.JWT_SECRET);
      req.data = data;
      if (data.email === undefined) {
        res.sendStatus(403);
      } else {
        next();
      }
    } catch (error) {
      res.sendStatus(403);
    }
  }
};

export default userAuth;