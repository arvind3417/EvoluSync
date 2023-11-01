import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateService {
  getHello(): string {
    return 'Hello World!';
  }
}
