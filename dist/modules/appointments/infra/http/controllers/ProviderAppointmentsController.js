"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _ListProviderAppointmentsServices = _interopRequireDefault(require("../../../services/ListProviderAppointmentsServices"));
var _classTransformer = require("class-transformer");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ProviderAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.query;
    const listProvidersAppointments = _tsyringe.container.resolve(_ListProviderAppointmentsServices.default);
    const appointments = await listProvidersAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json((0, _classTransformer.instanceToInstance)(appointments));
  }
}
exports.default = ProviderAppointmentsController;