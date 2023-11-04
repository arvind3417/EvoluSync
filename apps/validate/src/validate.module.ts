import { Module } from '@nestjs/common';
import { ValidateController } from './validate.controller';
import { ValidateService } from './validate.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ValidateController],
  providers: [ValidateService],
})
export class ValidateModule {}
