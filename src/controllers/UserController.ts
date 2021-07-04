import express from 'express';
import bcrypt from "bcrypt";
// @ts-ignore
import io from 'socket.io';

import { UserModel } from '../models';
import { IUser } from '../models/User';
import {createJWToken} from '../utils';
import { validationResult } from 'express-validator';


class UserController {
  private io: io.Server;

  constructor(io: io.Server) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    UserModel.findById(id, (err, user) => {
      if(err) {
        return res.status(404).json({
          message: 'not found'
        })
      }
      res.json(user)
    })
  }

  getMe = (req: any, res: express.Response) => {
    const id: string = req.user._id;
    UserModel.findById(id, (err, user) => {
      if(err) {
        return res.status(404).json({
          message: 'not found'
        })
      }
      res.json(user)
    })
  }

  create = (req : express.Request, res : express.Response) => {
    const postData = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
    };
    const user = new UserModel(postData);
    user.save()
    .then((obj : any) => {
      console.log('then')
      res.json(obj)
    })
    .catch((error) => {
      console.log('catch')
      res.json(error)
    })
  }

  remove = (req : express.Request, res : express.Response) => {
    const id: string = req.body.id;
    UserModel.findOneAndRemove({ _id: id }, (err, user) => {
      if(err) {
        return res.status(404).json({
          message: 'user not found'
        })
      }
      res.json({
        message: `user ${user ? user.fullName : ''} removed`
      })
    })
  }

  login = (req : express.Request, res : express.Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password,
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() })
    }

    UserModel.findOne({ email: postData.email }, (err, user: IUser) => {
      if(err) {
        return res.status(404).json({
          message: 'User not found'
        })
      }
      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWToken(user);
        res.json({
          status: "success",
          token,
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "Incorrect password or email",
        });
      }

    })
  }
}
export default UserController;