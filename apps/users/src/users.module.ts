import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/database';
import { UserEntity } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/rmq';
import { RoleEntity } from './entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RmqModule,
    DatabaseModule.register(),
    DatabaseModule.forEntity([UserEntity, RoleEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
