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

const { MongoHost } = require('./configuration');

mongoose.connect(`mongodb://${MongoHost}:27017/searchappdb`, {
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

app.use((err, req, res, next) => {
  if (!err) {
    next();
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Internal server error' : message,
    });
  }
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
