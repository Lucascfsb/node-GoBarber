"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticated;
var _jsonwebtoken = require("jsonwebtoken");
var _auth = _interopRequireDefault(require("../../../../../config/auth"));
var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
//import User from '../../typeorm/entities/User';

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decoded;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token', 401);
  }
}