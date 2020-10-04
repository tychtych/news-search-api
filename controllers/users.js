const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user');

const NotFoundError = require('../errors/notFound');
const ConflictErr = require('../errors/conflictErr');
const NotAuthorized = require('../errors/notAuthor');

const { SecretKey } = require('../configuration');

module.exports.getUserProfile = (req, res, next) => {
  UserSchema.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('There is no user with this id');
      }
      res.status(200).send({ email: user.email, name: user.name });
    })
    .catch(next);
};

module.exports.createNewUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => UserSchema.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: { name: user.name, email: user.email } }))
    .catch((err) => {
      if (err.errors.email && err.errors.email.kind === 'unique') {
        throw new ConflictErr('The user with this email already exists');
      }
      throw err;
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        SecretKey,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(() => next(new NotAuthorized('Please check email or password')));
};
