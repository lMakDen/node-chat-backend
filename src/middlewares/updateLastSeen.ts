import express from 'express';
import { UserModel } from '../models'


export default (
  // req: express.Request,
  req: any,
  res: express.Response,
  next: express.NextFunction) => {
  if(!req.user) {
    return next()
  }

  if(req.user) {
    UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        last_seen: new Date(),
      },
      { new: true },
      () => {}
    );
  }
  next()
}