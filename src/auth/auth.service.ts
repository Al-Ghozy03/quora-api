import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { UsersEntity } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginActivitiesEntity } from 'src/login_activities/login_activites.entity';
import { CustomHeader } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(LoginActivitiesEntity)
    private readonly loginActivity: Repository<LoginActivitiesEntity>,
  ) {}

  async register(body: RegisterDto, headers: CustomHeader) {
    if (
      !['x-device-id', 'x-platform', 'x-longtitude', 'x-latitude'].every((e) =>
        Object.keys(headers).includes(e),
      )
    )
      throw new ForbiddenException(
        'must contain x-device-id, x-platform, x-longtitude, x-latitude',
      );
    const check = await this.usersRepository.findOneBy({
      email: body.email,
      username: body.username,
    });
    if (check)
      throw new BadRequestException('username atau email sudah digunakan');
    const salt = await bcrypt.genSalt(13);
    body.password = await bcrypt.hash(body.password, salt);
    const { id, email, username, created_at } =
      await this.usersRepository.save(body);

    const loginActivity = await this.loginActivity.save({
      user: id,
      device_id: headers['x-device-id'],
      longtitude: headers['x-longtitude'],
      latitude: headers['x-latitude'],
      platform: headers['x-platform'],
    });
    const token = await this.jwtService.signAsync(
      {
        id,
        username,
        email,
        device_id: loginActivity.device_id,
        platform: loginActivity.platform,
      },
      { expiresIn: '30d', secret: process.env.JWT_SECRET },
    );
    return {
      message: 'success',
      token,
      data: { id, email, username, created_at },
    };
  }

  async login(body: LoginDto, headers: CustomHeader) {
    if (
      !['x-device-id', 'x-platform', 'x-longtitude', 'x-latitude'].every((e) =>
        Object.keys(headers).includes(e),
      )
    )
      throw new ForbiddenException(
        'must contain x-device-id, x-platform, x-longtitude, x-latitude',
      );
    const check = await this.usersRepository.findOneBy({
      username: body.username,
    });
    if (!check) throw new NotFoundException('username tidak ditemukan');
    const verify = await bcrypt.compareSync(body.password, check.password);
    if (!verify) throw new UnauthorizedException('password salah');

    const loginActivity = await this.loginActivity.save({
      user: check.id,
      device_id: headers['x-device-id'],
      longtitude: headers['x-longtitude'],
      latitude: headers['x-latitude'],
      platform: headers['x-platform'],
    });

    const token = await this.jwtService.signAsync(
      {
        id: check.id,
        username: check.username,
        email: check.email,
        device_id: loginActivity.device_id,
        platform: loginActivity.platform,
      },
      { expiresIn: '30d', secret: process.env.JWT_SECRET },
    );
    return {
      message: 'success',
      token,
      data: {
        id: check.id,
        email: check.email,
        username: check.username,
        created_at: check.created_at,
      },
    };
  }
}
