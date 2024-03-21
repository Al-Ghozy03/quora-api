import { Query, Resolver } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from '../schemas/user.schema';
import { UsersEntity } from 'src/users/users.entity';

@Resolver()
export class UserResolver {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  @Query(() => [UserSchema])
  async getUsers(): Promise<UserSchema[]> {
    return await this.userRepository.find();
  }
}
