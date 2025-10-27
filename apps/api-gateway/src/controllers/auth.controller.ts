import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from 'apps/users/src/dto/register.dto';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto } from 'apps/users/src/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterRequestDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    return await this.authService.login(dto);
  }
}
