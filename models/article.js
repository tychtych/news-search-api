const mongoose = require('mongoose');
const articleValidator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validator: (link) => articleValidator.isURL(link),
    message: 'Invalid URL',
  },
  image: {
    type: String,
    required: true,
    validator: (link) => articleValidator.isURL(link),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,

  },
});

module.exports = mongoose.model('article', articleSchema);
