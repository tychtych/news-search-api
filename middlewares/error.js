module.exports = (err, req, res, next) => {
  if (!err) {
    next();
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500 ? 'Internal server error' : message,
    });
  }
};
