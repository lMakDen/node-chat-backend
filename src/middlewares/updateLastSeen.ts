import express from 'express';
import { UserModel } from '../models'


export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  UserModel.findOneAndUpdate(
    { _id: '5e6e64627c51b003b03a4ca0' },
    {
      last_seen: new Date(),
    },
    { new: true },
    () => {}
    );
  next()
}