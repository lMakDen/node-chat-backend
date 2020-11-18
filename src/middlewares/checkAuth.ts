import express from 'express';
import { verifyJWToken } from '../utils'
import { IUser } from '../models/User'

// interface RequestCustom extends express.Request {
//   user?: IUser;
//   headers: {
//     token?: string;
//   };
// }


export default (
  req: any,
  res: any,
  next: any,
) => {

  if(req.path === '/user/login' || req.path === '/user/registration') {
    return next()
  }

  const token = req.headers.token;
  verifyJWToken(token).then(user => {
    req.user = user;
    next()
  })
    .catch(() => {
      res.status(403).json({
        message: 'Invalid auth token provided.'
      })
    })
}