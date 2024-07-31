import dotenv from "dotenv"
dotenv.config();
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

// Extend the SessionData interface
declare module 'express-session' {
  interface SessionData {
    isAdmin: boolean;
  }
}

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  console.log('username: ', username, '& password: ', password )
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.isAdmin = true; 
    res.status(200).json({ message: 'Logged in successfully' });
    console.log(req.session)
    return next()
  } else {

    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {

  if (req.session && req.session.isAdmin) {
    return next();
  } else {
    res.status(401).json({ message: 'Authentication required' });
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session!.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Logged out successfully' });
  });
};