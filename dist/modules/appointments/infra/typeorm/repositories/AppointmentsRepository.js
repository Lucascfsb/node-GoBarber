"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("../../../../../shared/infra/typeorm");
var _Appointment = _interopRequireDefault(require("../entities/Appointment"));
var _typeorm2 = require("typeorm");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = _typeorm.AppDataSource.getRepository(_Appointment.default);
  }
  async findByDate(date, provider_id) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    });
    return findAppointment || undefined;
  }
  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm2.Raw)(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }
  async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm2.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      },
      relations: ['user']
    });
    return appointments;
  }
  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }
}
var _default = exports.default = AppointmentsRepository;