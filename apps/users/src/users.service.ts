import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity, process.env.DB_CONTAINER_NAME)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity, process.env.DB_CONTAINER_NAME)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(dto: RegisterRequestDto) {
    const userRole = await this.roleRepository.findOne({
      where: {
        name: 'USER',
      },
    });

    if (!userRole) throw new Error('Role "USER" not found');

    const user = await this.userRepository.create({
      ...dto,
      roles: [userRole],
    });

    await this.userRepository.save(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['roles'],
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    return user;
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['roles'],
    });
  }
}
