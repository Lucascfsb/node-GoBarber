"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _User = _interopRequireDefault(require("../../typeorm/entities/User"));
var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    const authenticateUser = _tsyringe.container.resolve(_AuthenticateUserService.default);
    const {
      user,
      token
    } = await authenticateUser.execute({
      email,
      password
    });
    const userTransformed = (0, _classTransformer.instanceToPlain)((0, _classTransformer.plainToInstance)(_User.default, user));
    return response.json({
      user: userTransformed,
      token
    });
  }
}
exports.default = SessionsController;