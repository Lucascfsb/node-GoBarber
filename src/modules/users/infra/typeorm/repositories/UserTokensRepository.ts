import { AppDataSource } from "@shared/infra/typeorm/index";
import { Repository } from "typeorm";

import IUserTokensRepository from "@modules/users/repositories/IUserTokenRepository";

import UserToken from "../entities/UserToken";


class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor () {
    this.ormRepository = AppDataSource.getRepository(UserToken)
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOne({
      where: {token}
    })

    return userToken
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    })

    await this.ormRepository.save(userToken)

    return userToken
  }
}

export default UserTokensRepository
