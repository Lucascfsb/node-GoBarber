import {Request, Response} from 'express'
import { container } from "tsyringe";
import { plainToInstance, instanceToPlain } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import User from "@modules/users/infra/typeorm/entities/User";

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    if (!request.user) {
      return response.status(401).json({ error: 'User not authenticated' });
    }

    const user_id = (request.user as User).id

    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id })

    const userTransformed = instanceToPlain(plainToInstance(User, user));

    return response.json({ user: userTransformed})
  }

  public async update(request: Request, response: Response): Promise<Response> {
    if (!request.user) {
      return response.status(401).json({ error: 'User not authenticated' });
    }

    const user_id = (request.user as User).id
    const { name, email, old_password, password } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    })

    const userTransformed = instanceToPlain(plainToInstance(User, user));

    return response.json({ user: userTransformed})
  }
}
