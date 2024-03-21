import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UsersEntity } from 'src/users/users.entity';
import { UserSchema } from './user.schema';

@ObjectType()
export class QuestionSchema {
  @Field(() => Int)
  id: number;

  @Field()
  question: string;

  @Field(() => UserSchema)
  user: UsersEntity;

  @Field()
  is_deleted: boolean;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
