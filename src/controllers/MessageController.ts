import express from 'express';
// @ts-ignore
import io from 'socket.io';

import {MessageModel, DialogModel, UserModel} from '../models';
import HttpException from '../utils/types';


class MessageController {
  private io: io.Server;

  constructor(io: io.Server) {
    this.io = io;
  }

  index = (req: any, res: express.Response) => {
    const dialogId: any = req.query.dialog;
    const userId: any = req.user._id

    MessageModel.updateMany({
      dialog: dialogId, user: { $ne: userId }
    },
      {
        $set: { isRead: true }
      },
        (err: HttpException) => {
          if(err) {
            return res.status(500).json({
              status: 'error',
              message: err
            })
          }})

    MessageModel.find({ dialog: dialogId })
    .populate(['dialog', 'user'])
    .exec(function(err : HttpException, messages : any) {
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
      obj.populate(['dialog', 'user'], (err: HttpException, message: any) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: err,
          });
        }

        DialogModel.findOneAndUpdate(
          { _id: postData.dialog },
          { lastMessage: message._id },
          { upsert: true },
          (err) => {
            if (err) {
              return res.status(500).json({
                status: 'error',
                message: err,
              });
            }
          }
        )

        res.json(message)
        this.io.emit('SERVER:NEW_MESSAGE', message)
      })
    })
    .catch((error) => {
      res.json(error)
    })
  }

  remove = (req : express.Request, res : express.Response) => {
    const id: string = req.query.id;
    // @ts-ignore
    const userId: string = req.user._id;

    MessageModel.findById(id, (err, message: any) => {
      if(err) {
        return res.status(404).json({
          status: 'error',
          message: 'Message not found'
        })
      }

      if(message.user.toString() === userId) {
        message.remove().then(() => {
          const dialogId = message.dialog;

          MessageModel.findOne(
            { dialog: dialogId },
            {},
            { sort: { createdAt : -1 } },
            (err, lastMessage:any) => {
              if (err) {
                res.status(500).json({
                  status: "error",
                  message: err,
                });
              }

              // DialogModel.findOneAndUpdate(
              //   { _id: dialogId },
              //   { lastMessage: lastMessage._id },
              //   { upsert: true },
              //   (err) => {
              //     if (err) {
              //       return res.status(500).json({
              //         status: 'error',
              //         message: err,
              //       });
              //     }
              //   }
              // )
              //TODO посмотреть возможно можно заюзать findOneAndUpdate
              DialogModel.findById(dialogId, (err, dialog) => {
                if (err) {
                  res.status(500).json({
                    status: "error",
                    message: err,
                  });
                }

                if (!dialog) {
                  return res.status(404).json({
                    status: "not found",
                    message: err,
                  });
                }

                // @ts-ignore
                dialog.lastMessage = lastMessage._id;
                dialog.save();
              });
            }
          );
        })
        return res.json({
          status: "success",
          message: "Message deleted",
        });
      } else {
        return res.status(403).json({
          status: 'error',
          message: 'Have not permission'
        })
      }
    })
  }
}
export default MessageController;