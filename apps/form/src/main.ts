import { NestFactory } from '@nestjs/core';
import { FormModule } from './form.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(FormModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  // await app.listen(configService.get('PORT'));
  
  await app.listen(3000);
}
bootstrap();
