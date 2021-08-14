import express from 'express';
import bcrypt from "bcrypt";
// @ts-ignore
import io from 'socket.io';

import { FileModel } from '../models';
import { IFile } from '../models/File';
import {createJWToken} from '../utils';
import HttpException from '../utils/types';
import { validationResult } from 'express-validator';
import {Document} from "mongoose";

class UserController {

  constructor() {

  }

  create = (req: any, res: express.Response) => {
    const userId = req.user._id
    const file: any = req.file

    const fileData = {
      fileName: file.originalname,
      size: file.size,
      ext: file.format,
      url: file.path,
      user: userId,
    }
    const File = new FileModel(fileData)
    File
    .save()
      .then((fileObj) => {
        res.json({
          status: 'success',
          message: fileObj
        })
      }).catch((err) => {
        if(err){
          res.json({
            status: 'error',
            message: err
          })
        }
    })

  }
}
export default UserController;