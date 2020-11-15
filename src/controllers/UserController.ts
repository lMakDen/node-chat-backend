import express from 'express';
import { UserModel } from '../models';


class UserController {

  index(req: express.Request, res: express.Response){
    const id: string = req.params.id;
    console.log('req.params.id', req.params.id)
    UserModel.findById(id, (err, user) => {
      if(err) {
        return res.status(404).json({
          message: 'not found'
        })
      }
      res.json(user)
    })
  }

  create(req : express.Request, res : express.Response) {
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

  remove(req : express.Request, res : express.Response) {
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

}
export default UserController;