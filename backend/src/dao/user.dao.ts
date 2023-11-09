import { User } from '../entities/User';
import { AppDataSource } from '../database/dataSource';

import { Repository } from 'typeorm'

export class UserDAO {
  readonly userRepository: Repository<User>

  constructor () {
    this.userRepository = AppDataSource.getRepository(User)
  }

  public createUser (user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}