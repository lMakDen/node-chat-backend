import express from 'express';
import bodyParser from "body-parser";
// @ts-ignore
import io from 'socket.io';
// @ts-ignore
import cors from 'cors';
import {checkAuth, updateLastSeen} from "../middlewares";
import {DialogCtrl, MessageCtrl, UserCtrl} from "../controllers";
import {loginValidation, registerValidation} from "../utils/validators";


export default (app: express.Express, io: io.Server) => {

  const UserController = new UserCtrl(io);
  const DialogController = new DialogCtrl(io);
  const MessageController = new MessageCtrl(io);

  app.use(bodyParser.json());
  app.use(cors())
  app.use(checkAuth);
  app.use(updateLastSeen);

  app.get('/user/me', UserController.getMe);
  app.get('/user/verify', UserController.verify);
  app.get('/user/find', UserController.findUsers);
  app.get('/user/:id', UserController.index);

  app.post('/user/signUp', registerValidation, UserController.create);
  app.delete('/user/remove', UserController.remove);
  app.post('/user/signIn', loginValidation, UserController.login);

  app.get('/dialogs', DialogController.index);
  app.post('/dialogs', DialogController.create);
  app.delete('/dialogs/:id', DialogController.remove);

  app.get('/messages', MessageController.index);
  app.post('/messages', MessageController.create);
  app.delete('/messages/:id', MessageController.remove);
}