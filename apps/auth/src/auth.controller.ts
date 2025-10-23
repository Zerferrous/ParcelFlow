import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getAll() {
    return this.authService.getAll();
  }

  @Post()
  async register(@Body() dto: RegisterRequestDto) {
    return await this.authService.register(dto);
  }
}
