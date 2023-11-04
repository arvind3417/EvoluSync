import { Body, Controller, Get, UsePipes } from '@nestjs/common';
import { ValidateService } from './validate.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Get()
  getHello(): string {
    return this.validateService.getHello();
  }
  
  @EventPattern('validate')
  async validateBody(@Payload() data: any) {
    console.log(`Validated Successfully ${JSON.stringify(data.dto)}`);
    
    // Handle the validated request body
    return 'Validated Successfully';
  }
}
