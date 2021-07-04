import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:admin@cluster0.glm03.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);