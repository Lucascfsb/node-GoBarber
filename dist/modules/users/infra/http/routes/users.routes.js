"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("multer"));
var _upload = _interopRequireDefault(require("../../../../../config/upload"));
var _celebrate = require("celebrate");
var _UsersControllers = _interopRequireDefault(require("../controllers/UsersControllers"));
var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));
var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const usersRouter = (0, _express.Router)();
const usersController = new _UsersControllers.default();
const userAvatarController = new _UserAvatarController.default();
const upload = (0, _multer.default)(_upload.default.multer);
usersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
}), usersController.create);
usersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar'), userAvatarController.update);
var _default = exports.default = usersRouter;