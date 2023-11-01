import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { Channel, connect } from 'amqp-connection-manager';
import { Twilio } from 'twilio';

@Injectable()
export class RmqService {
  private twilioClient: Twilio;
  constructor(private readonly configService: ConfigService) {
    const accountSid = "ACf7d7700e896aaafc3cd7c2344fb96957";
    const authToken = "f91994ffd80e83968b28a86187880215";
    
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
  async assertQueueAndConsume(queueName: string) {
    // console.log(this.configService.get<string>('RABBIT_MQ_URI'));
    console.log(this.configService.get('RABBIT_MQ_BILLING_QUEUE'))
    await this.consumeQueue();
    await this.assertQueue(this.configService.get('RABBIT_MQ_BILLING_QUEUE'),"hhlloo")

  }
  async assertQueue(queueName: string,message:string) {
    try {
      const connection = await connect(this.configService.get<string>('RABBIT_MQ_URI'));
      const channel: Channel = await connection.createChannel();
      await channel.assertQueue(queueName);
      
      console.log(Buffer.from(message));
      
      channel.sendToQueue(queueName, Buffer.from(message));
  
  

  
      setTimeout(() => {
          connection.close();
      }, 500);

    } catch (error) {
      console.error(error);
      console.log('An error occurred while inserting form into the queue');
    }

   
  }

  async consumeQueue() {
    const senderPhoneNumber = "+12052364971";
    const queueName = this.configService.get('RABBIT_MQ_BILLING_QUEUE')
    console.log("mgmgmg");
    console.log("Starting to consume messages from queue:", queueName);
    console.log(queueName);
    

    const connection = await connect([
      this.configService.get<string>('RABBIT_MQ_URI')
    ], {
      heartbeatIntervalInSeconds: 5,

    });
    
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue(queueName,{durable:false});
    


    channel.consume(queueName, async (message) => {
      console.log("consuming222");
      
      
      if (message) {
          const receivedMessage = message.content.toString(); 
          console.log(receivedMessage);
          
      console.log("consuming");

               await this.twilioClient.messages
      .create({ body: "hello1", from: senderPhoneNumber, to:  "+917989747516"});
      channel.ack(message);
      }
      //  channel.ack(message);
  }, { noAck: false,autoAck: false });
  channel.addSetup(async (channel) => {
    console.log('Channel re-established.');
  });
  
  }

}
