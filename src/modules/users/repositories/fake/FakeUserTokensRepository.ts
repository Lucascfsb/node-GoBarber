import { v4 as uuidv4 } from 'uuid';

import IUserTokensRepository from '../IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { create } from 'domain';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuidv4(),
      token: uuidv4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.userTokens.push(userToken)

    return userToken
  }

  public async findByToken(token: string): Promise<UserToken | null>{
    const userToken = this.userTokens.find(findToken => findToken.token === token)

    return userToken || null
  }
}

export default FakeUserTokensRepository
