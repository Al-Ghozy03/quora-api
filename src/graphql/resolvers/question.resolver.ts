import { Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsEntity } from 'src/question/question.entity';
import { Repository } from 'typeorm';
import { QuestionSchema } from '../schemas/question.schema';

@Resolver()
export class QuestionResolver {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionRepository: Repository<QuestionsEntity>,
  ) {}
  @Query(() => [QuestionSchema])
  async getAllQuestions() {
    return await this.questionRepository.find({
      where: { is_deleted: false },
      relations: ['user'],
    });
  }
}
