import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const PORT = 3001;
  await app.listen(PORT);
  Logger.log(`AUTH app started on port: ${PORT}`);
}
bootstrap();
