import { Injectable } from '@nestjs/common';
import { RegisterRequestDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity, process.env.DB_CONTAINER_NAME)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async register(dto: RegisterRequestDto) {
    const user = await this.userRepository.create(dto);
    await this.userRepository.save(user);
    return user;
  }
}
