"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("../../../../../shared/infra/typeorm");
var _User = _interopRequireDefault(require("../entities/User"));
var _typeorm2 = require("typeorm");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _typeorm.AppDataSource.getRepository(_User.default);
  }
  async findById(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }
  async findAllProviders({
    except_user_id
  }) {
    let users;
    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: (0, _typeorm2.Not)(except_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }
  async create(userData) {
    const appointment = this.ormRepository.create(userData);
    await this.ormRepository.save(appointment);
    return appointment;
  }
  async save(user) {
    return this.ormRepository.save(user);
  }
}
var _default = exports.default = UsersRepository;