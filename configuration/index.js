const { JWT_SECRET, NODE_ENV, MONGO_URL } = process.env;

module.exports.SecretKey = NODE_ENV !== 'production' ? 'some-dev-secret' : JWT_SECRET;

module.exports.MongoUrl = NODE_ENV !== 'production' ? 'mongodb://localhost:27017/searchappdb' : MONGO_URL;
