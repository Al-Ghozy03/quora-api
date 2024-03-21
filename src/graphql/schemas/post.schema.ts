import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSchema } from './user.schema';

@ObjectType()
export class PostSchema {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  description: string;

  @Field(() => UserSchema, { nullable: true })
  user: UserSchema;

  @Field({ nullable: true })
  thumbnail: string;

  @Field({ nullable: true })
  cloudinary_id: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
