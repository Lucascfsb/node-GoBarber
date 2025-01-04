"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
if (!process.env.APP_SECRET) {
  throw new Error('Environment variable APP_SECRET is not defined');
}
var _default = exports.default = {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d'
  }
};