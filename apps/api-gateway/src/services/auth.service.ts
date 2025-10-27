import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { LoginRequestDto } from 'apps/users/src/dto/login.dto';
import { RegisterRequestDto } from 'apps/users/src/dto/register.dto';
import type { Response } from 'express';
import ms from 'ms';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private readonly authClient: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async register(res: Response, dto: RegisterRequestDto) {
    try {
      const { accessToken, refreshToken } = await lastValueFrom(
        this.authClient.send('auth.register', dto),
      );
      this.setCookie(
        res,
        refreshToken,
        new Date(
          Date.now() +
            ms(this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL')),
        ),
      );
      return { accessToken };
    } catch (error) {
      if (error.status === 409) {
        throw new ConflictException(error.message);
      }

      Logger.log('Unexpected RMQ error:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async login(res: Response, dto: LoginRequestDto) {
    try {
      const { accessToken, refreshToken } = await lastValueFrom(
        this.authClient.send('auth.login', dto),
      );
      this.setCookie(
        res,
        refreshToken,
        new Date(
          Date.now() +
            ms(this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL')),
        ),
      );
      return { accessToken };
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }

      Logger.log('Unexpected RMQ error:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: 'localhost', //TODO: add dynamic value from .env (prod/dev)
      expires,
      secure: false, //TODO: add dynamic value from .env (prod/dev)
      sameSite: 'none', //TODO: add dynamic value from .env (prod/dev)
    });
  }
}
