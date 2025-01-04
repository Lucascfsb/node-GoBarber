"use strict";

var _tsyringe = require("tsyringe");
var _BCryptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptHashProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_tsyringe.container.registerSingleton('HashProvider', _BCryptHashProvider.default);