const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const users = require('./routes/users');
const articles = require('./routes/articles');
const auth = require('./middlewares/auth');
const { createNewUser, login } = require('./controllers/users');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/searchappdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;

app.post('/signup', createNewUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', users);
app.use('/articles', articles);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
