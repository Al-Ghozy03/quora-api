import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsEntity } from './question.entity';
import { UsersEntity } from 'src/users/users.entity';
import { JwtHelper } from 'src/helper/jwt-helper';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsEntity, UsersEntity])],
  providers: [QuestionService, JwtHelper],
  controllers: [QuestionController],
})
export class QuestionModule {}
