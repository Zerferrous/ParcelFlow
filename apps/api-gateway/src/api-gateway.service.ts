import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class ApiGatewayService {
  constructor(@Inject('AUTH') private readonly authClient: ClientProxy) {}

  async getHello() {
    return await this.authClient.send('test', {
      message: 'test msg sended',
    });
  }
}
