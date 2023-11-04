import { NestFactory } from '@nestjs/core';
import { ValidateModule } from './validate.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const microServiceOptions = {
  transport: Transport.TCP,
  options: {
    host: 'validate',
    port : 3002
  }
}
async function bootstrap() {

  const app = await NestFactory.createMicroservice(
    ValidateModule,microServiceOptions
  );

  await app.listen();
}
bootstrap();
 