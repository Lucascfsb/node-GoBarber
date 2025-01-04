import {Request, Response} from 'express'
import { container } from "tsyringe";
import { plainToInstance, instanceToPlain } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import User from "@modules/users/infra/typeorm/entities/User";


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      user_id: (request.user as User).id,
      avatarFilename: (request.file as Express.Multer.File).filename,
    })

    const userTransformed = instanceToPlain(plainToInstance(User, user));

    return response.json({ user: userTransformed})
  }
}
