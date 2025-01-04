"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;
var _redis = require("redis");
var _AppError = _interopRequireDefault(require("../../../errors/AppError"));
var _rateLimiterFlexible = require("rate-limiter-flexible");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const redisClient = (0, _redis.createClient)({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
redisClient.connect().catch(err => {
  console.error('Redis connection error:', err);
});
const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimit',
  points: 10,
  duration: 1
});
async function rateLimiter(request, response, next) {
  try {
    const ip = request.ip || '';
    await limiter.consume(ip);
    return next();
  } catch (err) {
    throw new _AppError.default('Too many requests', 429);
  }
}
process.on('SIGINT', async () => {
  await redisClient.quit();
  console.log('Redis client disconnected');
  process.exit(0);
});