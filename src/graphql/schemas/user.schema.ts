import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSchema {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  date_of_birth: Date;

  @Field({ nullable: true })
  device_id: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
