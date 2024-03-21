import { Body, Controller, Headers, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { CustomHeader } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto, @Headers() header: CustomHeader) {
    return this.authService.register(data, header);
  }

  @Post('login')
  login(@Body() data: LoginDto, @Headers() header: CustomHeader) {
    return this.authService.login(data, header);
  }
}
