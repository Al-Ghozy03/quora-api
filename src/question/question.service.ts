import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDto } from './question.dto';
import { QuestionsEntity } from './question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { BaseService } from 'src/baseService';
import { JwtHelper } from 'src/helper/jwt-helper';
import { Request } from 'express';
import { JwtDto } from 'src/dto/jwt.dto';

@Injectable()
export class QuestionService extends BaseService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionRepository: Repository<QuestionsEntity>,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly jwtHelpder: JwtHelper,
  ) {
    super();
  }

  async create(body: CreateDto, req: Request) {
    const decoded: JwtDto = await this.jwtHelpder.decode(req);
    const check = await this.userRepository.findOneBy({ id: decoded.id });
    if (!check) throw new NotFoundException('user tidak ditemukan');
    const data = await this.questionRepository.save({
      ...body,
      user: decoded.id,
    });
    return this.success({
      message: 'success',
      statusCode: HttpStatus.CREATED,
      data,
    });
  }
}
