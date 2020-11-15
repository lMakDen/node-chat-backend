import express from 'express';
import { MessageModel } from '../models';


class MessageController {

  index(req: express.Request, res: express.Response){
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

  create(req : express.Request, res : express.Response) {
    const userId = '5e6e64627c51b003b03a4ca0'
    const postData = {
      text: req.body.text,
      user: userId,
      dialog: req.body.dialog_id,
    };
    console.log('postData', postData)
    const message = new MessageModel(postData);

    message.save()
    .then((obj : any) => {
      res.json(obj)
    })
    .catch((error) => {
      res.json(error)
    })
  }

  remove(req : express.Request, res : express.Response) {
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