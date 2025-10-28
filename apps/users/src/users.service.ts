import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity, process.env.DB_CONTAINER_NAME)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: RegisterRequestDto) {
    const user = await this.userRepository.create(dto);
    await this.userRepository.save(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneById(id);

    return user;
  }
}
