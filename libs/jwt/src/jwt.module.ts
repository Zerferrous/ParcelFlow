import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from './jwt.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {
  static register(): DynamicModule {
    return {
      module: JwtConfigModule,
      imports: [
        // Access token
        NestJwtModule.registerAsync({
          inject: [ConfigService],
          //@ts-ignore
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_TTL'),
            },
          }),
        }),
        // Refresh token
        NestJwtModule.registerAsync({
          inject: [ConfigService],
          //@ts-ignore
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: configService.get<string>('JWT_REFRESH_TOKEN_TTL'),
            },
          }),
        }),
      ],
      providers: [JwtConfigService],
      exports: [JwtConfigService, NestJwtModule],
    };
  }
}
