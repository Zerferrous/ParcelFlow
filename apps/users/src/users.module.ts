import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/database';
import { UserEntity } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/rmq';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RmqModule,
    DatabaseModule.register(),
    DatabaseModule.forEntity([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
