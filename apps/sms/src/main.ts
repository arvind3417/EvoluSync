import { NestFactory } from '@nestjs/core';
import { SmsModule } from './sms.module';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // const app = await NestFactory.create(SmsModule);
  // await app.listen(3000);
  const app = await NestFactory.create(SmsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await rmqService.consumeQueue('billing');

  
}

bootstrap();
