"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _classTransformer = require("class-transformer");
var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));
var _User = _interopRequireDefault(require("../../typeorm/entities/User"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UserAvatarController {
  async update(request, response) {
    const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    const userTransformed = (0, _classTransformer.instanceToPlain)((0, _classTransformer.plainToInstance)(_User.default, user));
    return response.json({
      user: userTransformed
    });
  }
}
exports.default = UserAvatarController;