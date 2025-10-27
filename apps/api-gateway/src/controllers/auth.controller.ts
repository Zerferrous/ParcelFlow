import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterRequestDto } from 'apps/users/src/dto/register.dto';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto } from 'apps/users/src/dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequestDto,
  ) {
    return await this.authService.register(res, dto);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return await this.authService.login(res, dto);
  }
}
