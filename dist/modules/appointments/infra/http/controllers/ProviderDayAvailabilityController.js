"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ProviderDayAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year,
      day
    } = request.query;
    const listProviderDayAvailability = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);
    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }
}
exports.default = ProviderDayAvailabilityController;