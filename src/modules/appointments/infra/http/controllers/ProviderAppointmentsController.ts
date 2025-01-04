import {Request, Response} from 'express'
import { container } from "tsyringe";

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsServices';

import User from '@modules/users/infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = (request.user as User).id
    const { day, month, year } = request.query;

    const listProvidersAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProvidersAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return response.json(instanceToInstance(appointments));
  }
}
