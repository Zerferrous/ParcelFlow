import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  constructor() {}

  async getHello() {
    return 'Hello world';
  }
}
