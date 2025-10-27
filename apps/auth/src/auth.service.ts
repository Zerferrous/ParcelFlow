import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  test() {
    return 'tested';
  }
}
