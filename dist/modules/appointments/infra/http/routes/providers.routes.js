"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));
var _ProvidersController = _interopRequireDefault(require("../controllers/ProvidersController"));
var _ProviderMonthAvailabilityController = _interopRequireDefault(require("../controllers/ProviderMonthAvailabilityController"));
var _ProviderDayAvailabilityController = _interopRequireDefault(require("../controllers/ProviderDayAvailabilityController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const providersRouter = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providersControllerMonthAvailability = new _ProviderMonthAvailabilityController.default();
const providersControllerDayAvailability = new _ProviderDayAvailabilityController.default();
providersRouter.use(_ensureAuthenticated.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providersControllerMonthAvailability.index);
providersRouter.get('/:provider_id/day-availability', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    provider_id: _celebrate.Joi.string().uuid().required()
  }
}), providersControllerDayAvailability.index);
var _default = exports.default = providersRouter;