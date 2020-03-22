import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { UserController } from './controllers';

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


app.get('/user/:id', User.index);
app.post('/user/create', User.create);
app.delete('/user/remove', User.remove);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});