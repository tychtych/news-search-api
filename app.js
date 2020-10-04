const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const helmet = require('helmet');
const users = require('./routes/users');
const articles = require('./routes/articles');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { createNewUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { MongoUrl } = require('./configuration');

mongoose.connect(MongoUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.post('/signup', createNewUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', users);
app.use('/articles', articles);

app.use(errorLogger); // подключаем логгер ошибок

app.use(error);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
