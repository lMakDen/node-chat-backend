import express from 'express';
import { DialogModel } from '../models';


class DialogController {

  index(req: express.Request, res: express.Response){
    const authorId: any = req.params.id;
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
    .then((obj : any) => {
      res.json(obj)
    })
    .catch((error) => {
      res.json(error)
    })
  }

  // remove(req : express.Request, res : express.Response) {
  //   const id: string = req.body.id;
  //   DialogModel.findOneAndRemove({ _id: id }, (err, user) => {
  //     if(err) {
  //       return res.status(404).json({
  //         message: 'user not found'
  //       })
  //     }
  //     res.json({
  //       message: `user ${user ? user.fullName : ''} removed`
  //     })
  //   })
  // }

}
export default DialogController;