const Article = require('../models/article');

const ForbiddenError = require('../errors/forbiddErr');
const NotFoundError = require('../errors/notFound');

// todo if not found
module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(new NotFoundError('Article not found'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You can delete only your card');
      } else {
        Article.deleteOne(article)
          .then(() => res.send({ message: 'Article is deleted!' }));
      }
    })
    .catch(next);
};
