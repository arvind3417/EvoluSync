import { Controller, Get } from '@nestjs/common';
import { GgsheetService } from './ggsheet.service';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class GgsheetController {
  constructor(private readonly ggsheetService: GgsheetService,
    private readonly rmqService: RmqService,
    private config: ConfigService) {}


  @EventPattern('push')
  async handler_GGS(@Payload() data:any, @Ctx() context:RmqContext){
    return await this.ggsheetService.sendMessage("pushing to google sheet");
  }
}
