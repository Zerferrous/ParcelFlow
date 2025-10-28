import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const token =
      req.headers['authorization']?.replace('Bearer ', '') ||
      req.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedException('Missing access token');
    }

    try {
      const verifiedPayload = await lastValueFrom(
        this.authClient.send('auth.verify', token),
      );
      req['user'] = verifiedPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
