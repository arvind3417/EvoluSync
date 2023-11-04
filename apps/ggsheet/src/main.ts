import { NestFactory } from '@nestjs/core';
import { GgsheetModule } from './ggsheet.module';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(GgsheetModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('GGS'));
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await rmqService.consumeQueue(configService.get('RABBIT_MQ_GGS_QUEUE'));
}
bootstrap();
