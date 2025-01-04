import {Request, Response} from 'express'
import { container } from "tsyringe";
import { plainToInstance, instanceToPlain } from 'class-transformer';

import User from '../../typeorm/entities/User';

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user , token} = await authenticateUser.execute({
      email,
      password,
    })

    const userTransformed = instanceToPlain(plainToInstance(User, user));

    return response.json({ user: userTransformed, token });
  }
}
