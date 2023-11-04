import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { BILLING_SERVICE, GGS_SERVICE } from "./constants/constant-service";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom, catchError, firstValueFrom, throwError } from "rxjs"; // Import catchError
import { RmqService } from "@app/common";

@Injectable()
export class FormService {
  private validateClient: ClientProxy

  constructor(
    private prisma: PrismaService,
    @Inject(BILLING_SERVICE) private smsClient: ClientProxy,
    @Inject(GGS_SERVICE) private ggsClient: ClientProxy,
    
    private rmq:RmqService
  ) {
    this.validateClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
          host: 'validate',
          port: 3002
      }
  })    
  } 

  getHello(): string {
    return "Hello World!!!!";
  }
  async createTodo(dto: any) {
    try {
      const existingUser = await this.prisma.form.findFirst({
        where: {
          phoneNumber: dto.phoneNumber,
        },
      });
  
      if (existingUser) {
        throw new BadRequestException('Already submitted');
      }
  
      await lastValueFrom(
        this.validateClient.emit('validate', {
          dto,
        })
      );
  
      const form = await this.prisma.form.create({ data: dto });
  
      await firstValueFrom(
        this.smsClient.emit('send', {
          dto,
        })
      );
  
      await lastValueFrom(
        this.ggsClient.emit('push', {
          dto,
        })
      );
  
      return form;
    } catch (error) {
      return throwError(error);
    }
  }
}
