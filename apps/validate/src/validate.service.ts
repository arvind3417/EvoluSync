import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ValidateService {
  getHello(): string {
    return 'Hello World!';
  }
  async validateData(dto: any): Promise<string[]> {
    const errors = await validate(dto);


    if (errors.length > 0) {
      const errorMessages = errors.map((error) => Object.values(error.constraints)).flat();
      console.log(errorMessages);
      
      return errorMessages;
    }

    return [];
  }

}
