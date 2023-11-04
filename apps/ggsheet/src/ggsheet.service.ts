import { RmqService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GgsheetService {
constructor(private config:ConfigService,private rmq:RmqService){

}
  async sendMessage( message: any) {
    return this.rmq.assertQueue('ggs',`dayummm ${message}`)
  }
}
