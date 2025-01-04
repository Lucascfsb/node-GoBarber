"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("../../../../../shared/infra/typeorm");
var _Notification = _interopRequireDefault(require("../schemas/Notification"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NotificationsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _typeorm.MongoDataSource.getMongoRepository(_Notification.default);
  }
  async create({
    recipient_id,
    content
  }) {
    const notification = this.ormRepository.create({
      recipient_id,
      content
    });
    await this.ormRepository.save(notification);
    return notification;
  }
}
var _default = exports.default = NotificationsRepository;