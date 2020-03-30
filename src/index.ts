import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController, DialogController } from './controllers';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0-glm03.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

const User = new UserController();
const Dialog = new DialogController();


app.get('/user/:id', User.index);
app.post('/user/create', User.create);
app.delete('/user/remove', User.remove);

app.get('/dialogs/:id', Dialog.index);
app.post('/dialogs', Dialog.create);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});