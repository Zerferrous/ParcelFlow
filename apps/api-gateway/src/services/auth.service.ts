import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginRequestDto } from 'apps/users/src/dto/login.dto';
import { RegisterRequestDto } from 'apps/users/src/dto/register.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {}

  async register(dto: RegisterRequestDto) {
    try {
      return await lastValueFrom(this.authClient.send('auth.register', dto));
    } catch (error) {
      if (error.status === 409) {
        throw new ConflictException(error.message);
      }

      Logger.log('Unexpected RMQ error:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async login(dto: LoginRequestDto) {
    try {
      return await lastValueFrom(this.authClient.send('auth.login', dto));
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }

      Logger.log('Unexpected RMQ error:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
