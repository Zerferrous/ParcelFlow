import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';
import { RmqService } from '@app/rmq';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('AUTH', true));
  await app.startAllMicroservices();
}
bootstrap();
