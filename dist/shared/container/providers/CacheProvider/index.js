"use strict";

var _tsyringe = require("tsyringe");
var _RedisCacheProvider = _interopRequireDefault(require("./implementations/RedisCacheProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const providers = {
  redis: _RedisCacheProvider.default
};
_tsyringe.container.registerSingleton('CacheProvider', providers.redis);