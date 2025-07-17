import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access Token required' });
    return;
  }

  const accessToken = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(accessToken, process.env.SECRET_KEY || 'default');
    req.user = user;
    next();
  } catch (err) {
    res.json({ message: 'Invalid or expired token' });
  }
};
export default middleware;