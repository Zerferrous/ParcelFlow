import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterRequestDto } from 'apps/users/src/dto/register.dto';
import { LoginRequestDto } from 'apps/users/src/dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  async register(@Payload() dto: RegisterRequestDto) {
    return await this.authService.register(dto);
  }

  @MessagePattern('auth.login')
  async login(@Payload() dto: LoginRequestDto) {
    return await this.authService.login(dto);
  }

  @MessagePattern('auth.refresh')
  async refresh(@Payload() token: string) {
    return await this.authService.refresh(token);
  }
}
