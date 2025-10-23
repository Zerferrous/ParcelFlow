import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@app/database';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [DatabaseModule.register(), DatabaseModule.forEntity([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
