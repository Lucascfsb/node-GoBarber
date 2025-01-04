"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fake/FakeUsersRepository"));
var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let fakeUsersRepository;
let fakeCacheProvider;
let listProviders;
describe("ListProviders", () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@exemple.com',
      password: '123456'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@exemple.com',
      password: '123456'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});