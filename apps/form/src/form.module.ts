import { Module } from "@nestjs/common";
import { FormController } from "./form.controller";
import { FormService } from "./form.service"; 

import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { RmqModule } from "@app/common";
import { BILLING_SERVICE, GGS_SERVICE } from "./constants/constant-service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RmqModule.register({
      name: BILLING_SERVICE, 
    }), 
    RmqModule.register({
      name: GGS_SERVICE, 
    }), 
    ClientsModule.register([
      {
        name: 'VALIDATE',
        transport: Transport.TCP,
      },
    ]),
  ], 
  controllers: [FormController],
  providers: [FormService], 
})
export class FormModule {}
