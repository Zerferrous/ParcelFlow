import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterRequestDto } from './dto/register.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  async create(@Payload() dto: RegisterRequestDto) {
    return this.usersService.create(dto);
  }

  @MessagePattern('users.findByEmail')
  async findByEmail(@Payload() email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern('users.findById')
  async findById(@Payload() id: string) {
    return this.usersService.findById(id);
  }

  @MessagePattern('users.findAll')
  async findAll() {
    return this.usersService.findAll();
  }
}
