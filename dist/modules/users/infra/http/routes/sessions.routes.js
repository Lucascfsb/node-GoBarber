"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _SessionsController = _interopRequireDefault(require("../controllers/SessionsController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const sessionsRouter = (0, _express.Router)();
const sessionsController = new _SessionsController.default();
sessionsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), sessionsController.create);
var _default = exports.default = sessionsRouter;