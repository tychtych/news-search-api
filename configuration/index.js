const { JWT_SECRET, NODE_ENV, MONGO_HOST } = process.env;

module.exports.SecretKey = NODE_ENV !== 'production' ? 'some-dev-secret' : JWT_SECRET;

module.exports.MongoHost = NODE_ENV !== 'production' ? 'localhost' : MONGO_HOST;
