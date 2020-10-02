const jwt = require('jsonwebtoken');

const { SecretKey } = require('../secretpath/secret');
const NotAuthorized = require('../errors/notAuthor');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthorized('You should be signed in'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SecretKey);
  } catch (err) {
    return next(new NotAuthorized('You should be signed in'));
  }

  req.user = payload;
  return next();
};
