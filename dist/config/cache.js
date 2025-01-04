"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_POR,
      password: process.env.REDIS_PASS
    }
  }
};