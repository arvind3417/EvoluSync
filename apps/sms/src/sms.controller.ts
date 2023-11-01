import { Controller, Get } from '@nestjs/common';
import { SmsService } from './sms.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import amqp from 'amqp-connection-manager';
import { ConfigService } from '@nestjs/config';

@Controller()
export class SmsController {
  constructor(private readonly smsService: SmsService,
    private readonly rmqService: RmqService,
    private config: ConfigService
    ) {}

  @Get()
  getHello(): string {
    return this.smsService.getHello();
  }
  @EventPattern("send")
  async handlersms(@Payload() data:any, @Ctx() context:RmqContext){


    // const channel = context.getChannelRef();
    // const orginalMessage = context.getMessage();
    // // console.log('data', data);
    // // console.log(orginalMessage);
     
    // channel.ack(orginalMessage);
    console.log("hey");
    console.log(data.dto.phoneNumber);
    return await this.smsService.sendMessage(data.dto.phoneNumber);
 
    
    

  }
//    async SmsQueue(message) {
//     try {
//         const connection = await amqp.connect('amqp://rabbitmq');
//         const channel = await connection.createChannel();

//         const queueName = 'twiliosms';

//         await channel.assertQueue(queueName, { durable: false });
//         channel.sendToQueue(queueName, Buffer.from(message));

//         console.log(`Sent: ${message}`);

//         setTimeout(() => {
//             connection.close();
//         }, 500);
//     } catch (error) {
//         console.error(error);
//         console.log('An error occurred while inserting form into the queue');
//     }
// };
}
