import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('test')
  async test() {
    return await this.authService.test();
  }
}
