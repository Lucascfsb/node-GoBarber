import {Request, Response} from 'express'
import { container } from "tsyringe";
import { instanceToInstance } from "class-transformer";

import ListProvidersService from "@modules/appointments/services/ListProvidersService";
import User from "@modules/users/infra/typeorm/entities/User";


export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = (request.user as User).id

    const listProviders= container.resolve(ListProvidersService);

    const providers = await listProviders.execute({user_id})

    return response.json(instanceToInstance(providers));
  }
}
