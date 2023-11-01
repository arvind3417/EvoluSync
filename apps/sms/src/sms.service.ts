import { RmqService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';


@Injectable()
export class SmsService {
  private twilioClient: Twilio;
  constructor(private config:ConfigService,private rmq:RmqService){
    const accountSid = "AC3f85b4a45dbaaf287303beaa5c6d6b55";
    const authToken = "5344e18093b1a9362ac6752bb848af90";
    
    this.twilioClient = new Twilio(accountSid, authToken);
  }
  getHello(): string {
    return 'Hello World!';
  }
  async sendMessage( message: any) {
    const senderPhoneNumber = this.config.get('TWILIO_NUMBER');
    console.log("hii form sendmessage");
    
    // console.log(`undefinded wala ${this.rmq.consumeQueue()}`);
    
    // await this.rmq.assertQueue(this.config.get('RABBIT_MQ_BILLING_QUEUE').toString())
     this.rmq.assertQueue('billing',`dayummm ${message}`)
    // (message) => {
    //   if (message !== null) {
    //     console.log('Received message:', message.toString());
    //     // Handle your message processing here
    //   }
    // }
    // );
    // console.log(senderPhoneNumber);

 return senderPhoneNumber;

  }
}
