import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RmqModule } from '@app/rmq';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '@app/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtConfigModule.register(),
    RmqModule,
    RmqModule.register({
      name: 'USERS',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
