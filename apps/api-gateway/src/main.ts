import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.port ?? 3000);
  Logger.log(`API-GATEWAY started on port ${process.env.port ?? 3000}`);
}
bootstrap();
