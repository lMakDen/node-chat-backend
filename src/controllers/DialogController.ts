import express from 'express';
import { DialogModel, MessageModel } from '../models';


class DialogController {

  index(req: express.Request, res: express.Response){
    const authorId: any = '5e6e64627c51b003b03a4ca0' || req.params.id;
    DialogModel.find({ author: authorId })
    .populate(['author', 'partner'])
    .exec(function(err : any, dialogs : any) {
      if (err) {
        return res.status(404).json({
          message: 'Dialogs not found',
        });
      }
      return res.json(dialogs);
    });
  }

  create(req : express.Request, res : express.Response) {
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

  remove(req : express.Request, res : express.Response) {
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