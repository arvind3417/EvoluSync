import { NestFactory } from '@nestjs/core';
import { SmsModule } from './sms.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  // const app = await NestFactory.create(SmsModule);
  // await app.listen(3000);
  const app = await NestFactory.create(SmsModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await rmqService.consumeQueue();
  await app.startAllMicroservices();

  
}

bootstrap();
