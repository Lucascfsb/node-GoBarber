"use strict";

var _tsyringe = require("tsyringe");
var _HandlebarsMailTemplateProvider = _interopRequireDefault(require("./implementations/HandlebarsMailTemplateProvider"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const providers = {
  handlebars: _HandlebarsMailTemplateProvider.default
};
_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebars);