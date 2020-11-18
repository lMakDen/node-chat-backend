import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { UserController, DialogController, MessageController } from './controllers';
import { updateLastSeen, checkAuth } from './middlewares';
import { loginValidation } from './utils/validators';

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

mongoose.connect('mongodb+srv://admin:admin@cluster0.glm03.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
);

const User = new UserController();
const Dialog = new DialogController();
const Message = new MessageController();

console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);

app.get('/user/:id', User.index);
app.post('/user/registration', User.create);
app.delete('/user/remove', User.remove);
app.post('/user/login', loginValidation, User.login);

app.get('/dialogs', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.remove);

app.get('/messages', Message.index);
app.post('/messages', Message.create);
app.delete('/messages/:id', Message.remove);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});