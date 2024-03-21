import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateDto } from './question.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Body() data: CreateDto, @Request() req) {
    return this.questionService.create(data, req);
  }
}
