import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController, DialogController, MessageController } from './controllers';

const app = express();
app.use(bodyParser.json());

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


app.get('/user/:id', User.index);
app.post('/user/create', User.create);
app.delete('/user/remove', User.remove);

app.get('/dialogs', Dialog.index);
app.post('/dialogs', Dialog.create);
app.delete('/dialogs/:id', Dialog.remove);

app.get('/messages', Message.index);
app.post('/messages', Message.create);
app.delete('/messages/:id', Message.remove);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});