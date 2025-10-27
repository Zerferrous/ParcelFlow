import { JwtConfigService } from '@app/jwt';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterRequestDto } from 'apps/users/src/dto/register.dto';
import { hash, verify } from 'argon2';
import { lastValueFrom } from 'rxjs';
import { JwtPayload } from './interfaces/jwt.interface';
import { LoginRequestDto } from 'apps/users/src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS') private readonly usersClient: ClientProxy,
    private readonly jwtService: JwtConfigService,
  ) {}

  async register(dto: RegisterRequestDto) {
    const { email, password } = dto;
    const exsisting = await lastValueFrom(
      this.usersClient.send('users.findByEmail', email),
    );

    if (exsisting)
      throw new RpcException({
        status: 409,
        message: 'User with this email already exists',
        error: 'ConflictException',
      });

    const hashedPassword = await hash(password);

    const user = await lastValueFrom(
      this.usersClient.send('users.create', {
        ...dto,
        password: hashedPassword,
      }),
    );

    return this.generateTokens(user.id);
  }

  async login(dto: LoginRequestDto) {
    const { email, password } = dto;
    const user = await lastValueFrom(
      this.usersClient.send('users.findByEmail', email),
    );

    if (!user)
      throw new RpcException({
        status: 404,
        message: 'User not found',
        error: 'NotFoundException',
      });

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword)
      throw new RpcException({
        status: 404,
        message: 'User not found',
        error: 'NotFoundException',
      });

    return this.generateTokens(user.id);
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };
    const accessToken = this.jwtService.signAccessToken(payload);
    const refreshToken = this.jwtService.signRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }
}
