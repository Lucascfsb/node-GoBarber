"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));
var _User = _interopRequireDefault(require("../../typeorm/entities/User"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createUser = _tsyringe.container.resolve(_CreateUserService.default);
    const user = await createUser.execute({
      name,
      email,
      password
    });
    const userTransformed = (0, _classTransformer.instanceToPlain)((0, _classTransformer.plainToInstance)(_User.default, user));
    return response.json({
      user: userTransformed
    });
  }
}
exports.default = UsersController;