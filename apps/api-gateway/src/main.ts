import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT') ?? 6000);
  Logger.log(
    `API-GATEWAY started on port ${configService.get('PORT') ?? 6000}`,
  );
}
bootstrap();
