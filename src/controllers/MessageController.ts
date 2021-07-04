import express from 'express';
// @ts-ignore
import io from 'socket.io';

import { MessageModel } from '../models';


class MessageController {
  private io: io.Server;

  constructor(io: io.Server) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
    const dialogId: any = req.query.dialog;
    MessageModel.find({ dialog: dialogId })
    .populate(['dialog'])
    .exec(function(err : any, messages : any) {
      if (err) {
        return res.status(404).json({
          message: 'Messages not found',
        });
      }
      return res.json(messages);
    });
  }

  create = (req : any, res : express.Response) => {
    const userId = req.user._id
    const postData = {
      text: req.body.text,
      user: userId,
      dialog: req.body.dialog_id,
    };

    const message = new MessageModel(postData);

    message.save()
    .then((obj : any) => {
      obj.populate('dialog', (err: any, message: any) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        }
        res.json(message)
        this.io.emit('SERVER:NEW_MESSAGE', message)
      })
    })
    .catch((error) => {
      res.json(error)
    })
  }

  remove = (req : express.Request, res : express.Response) => {
    const id: string = req.params.id;
    MessageModel.findOneAndRemove({ _id: id })
    .then(message => {
      if(message) {
        res.json({
          message: 'Message was deleted'
        })
      }
    })
    .catch(() => {
      res.json({
        message: 'Message not found'
      })
    })
  }

}
export default MessageController;