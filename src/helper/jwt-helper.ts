import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtHelper {
  constructor(private jwtService: JwtService) {}
  async decode(req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    const decode = await this.jwtService.decode(token);
    return decode;
  }
}
