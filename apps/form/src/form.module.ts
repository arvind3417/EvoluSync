import { Module } from "@nestjs/common";
import { FormController } from "./form.controller";
import { FormService } from "./form.service";

import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { RmqModule } from "@app/common";
import { BILLING_SERVICE } from "./constants/constant-service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RmqModule.register({
      name: BILLING_SERVICE, 
    }), 
  ], 
  controllers: [FormController],
  providers: [FormService], 
})
export class FormModule {}
