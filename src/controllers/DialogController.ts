import express from 'express';
// @ts-ignore
import io from 'socket.io';
import { DialogModel, MessageModel } from '../models';


class DialogController {
  private io: io.Server;

  constructor(io: io.Server) {
    this.io = io;
  }
  index = (req: any, res: express.Response) => {
    const authorId: any = req.user._id;
    DialogModel.find({ author: authorId })
    .populate(['author', 'partner'])
    .populate({
      path: 'lastMessage',
      populate: {
        path: 'user'
      }
    })
    .exec(function(err : any, dialogs : any) {
      if (err) {
        return res.status(404).json({
          message: 'Dialogs not found',
        });
      }
      return res.json(dialogs);
    });
  }

  create = (req : express.Request, res : express.Response) => {
    const postData = {
      author: req.body.author,
      partner: req.body.partner,
    };
    const dialog = new DialogModel(postData);

    dialog.save()
    .then((dialogObj: any) => {
      const message = new MessageModel({
        text: req.body.text,
        user: req.body.author,
        dialog: dialogObj._id,
      })
      message.save().then(() => {
        res.json(dialogObj)
      }).catch((error) => {
        res.json(error)
      })
    })
    .catch((error) => {
      res.json(error)
    })
  }

  remove = (req : express.Request, res : express.Response) => {
    const id: string = req.params.id;
    DialogModel.findOneAndRemove({ _id: id }, (err) => {
      if(err) {
        return res.status(404).json({
          message: 'user not found'
        })
      }
      res.json({
        message: `dialog removed`
      })
    })
  }

}
export default DialogController;