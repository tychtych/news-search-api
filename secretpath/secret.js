const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.SecretKey = NODE_ENV !== 'production' ? 'some-dev-secret' : JWT_SECRET;
