import { Module } from '@nestjs/common';
import { GgsheetController } from './ggsheet.controller';
import { GgsheetService } from './ggsheet.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_GGS_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
  ],
  controllers: [GgsheetController],
  providers: [GgsheetService],
})
export class GgsheetModule {}
