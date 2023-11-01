import { NestFactory } from '@nestjs/core';
import { ValidateModule } from './validate.module';

async function bootstrap() {
  const app = await NestFactory.create(ValidateModule);
  await app.listen(3000);
}
bootstrap();
