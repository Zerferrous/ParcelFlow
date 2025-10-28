import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private readonly usersClient: ClientProxy) {}

  async getCurrentUser(id: string) {
    return await lastValueFrom(this.usersClient.send('users.findById', id));
  }
}
