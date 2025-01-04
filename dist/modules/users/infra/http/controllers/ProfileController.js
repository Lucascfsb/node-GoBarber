"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));
var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));
var _User = _interopRequireDefault(require("../../typeorm/entities/User"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ProfileController {
  async show(request, response) {
    if (!request.user) {
      return response.status(401).json({
        error: 'User not authenticated'
      });
    }
    const user_id = request.user.id;
    const showProfile = _tsyringe.container.resolve(_ShowProfileService.default);
    const user = await showProfile.execute({
      user_id
    });
    const userTransformed = (0, _classTransformer.instanceToPlain)((0, _classTransformer.plainToInstance)(_User.default, user));
    return response.json({
      user: userTransformed
    });
  }
  async update(request, response) {
    if (!request.user) {
      return response.status(401).json({
        error: 'User not authenticated'
      });
    }
    const user_id = request.user.id;
    const {
      name,
      email,
      old_password,
      password
    } = request.body;
    const updateProfile = _tsyringe.container.resolve(_UpdateProfileService.default);
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    });
    const userTransformed = (0, _classTransformer.instanceToPlain)((0, _classTransformer.plainToInstance)(_User.default, user));
    return response.json({
      user: userTransformed
    });
  }
}
exports.default = ProfileController;