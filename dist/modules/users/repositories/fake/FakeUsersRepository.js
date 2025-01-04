"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uuid = require("uuid");
var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FakeUsersRepository {
  constructor() {
    this.users = [];
  }
  async findById(id) {
    const findUser = this.users.find(user => user.id === id);
    return findUser || null;
  }
  async findByEmail(email) {
    const findUser = this.users.find(user => user.email === email);
    return findUser || null;
  }
  async findAllProviders({
    except_user_id
  }) {
    let {
      users
    } = this;
    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }
    return users;
  }
  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuid.v4)()
    }, userData);
    this.users.push(user);
    return user;
  }
  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}
var _default = exports.default = FakeUsersRepository;