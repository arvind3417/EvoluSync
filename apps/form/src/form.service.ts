import { Inject, Injectable } from "@nestjs/common";
import { CreateFormDto } from "./dto/form.dto";
import { PrismaService } from "./prisma/prisma.service";
import { BILLING_SERVICE } from "./constants/constant-service";
import { ClientProxy } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom, catchError, firstValueFrom } from "rxjs"; // Import catchError
import { RmqService } from "@app/common";

@Injectable()
export class FormService {
  constructor(
    private prisma: PrismaService,
    @Inject(BILLING_SERVICE) private smsClient: ClientProxy,
    private rmq:RmqService
  ) {}

  getHello(): string {
    return "Hello World!!!!";
  }

  async createTodo(dto: CreateFormDto) {
    console.log("this");

    try {
      console.log("this");

      const form = await this.prisma.form.create({ data: dto });
    //  await this.rmq.assertQueue("billing","hello1");

      await firstValueFrom(
        this.smsClient.emit("send", {
          dto,
        })
      );
      
      console.log("done");

      return form;
    } catch (error) {
      // Handle any errors that occur outside of the observable sequence (e.g., Prisma errors)
      console.error("Error outside of observable sequence:", error);
      throw new Error("Form creation failed");
    }
  }
}
