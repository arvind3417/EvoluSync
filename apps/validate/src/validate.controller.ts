import { Controller, Get } from '@nestjs/common';
import { ValidateService } from './validate.service';

@Controller()
export class ValidateController {
  constructor(private readonly validateService: ValidateService) {}

  @Get()
  getHello(): string {
    return this.validateService.getHello();
  }
}
