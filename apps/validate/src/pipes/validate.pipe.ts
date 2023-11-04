// validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log("errrere");
      
      throw new BadRequestException(this.formatErrors(errors));
    }
    return value;
  }

//   private toValidate(metatype: Function): boolean {
//     const types = [String, Boolean, Number, Array, Object];
//     return !types.includes(metatype);
//   }

  private formatErrors(errors: any[]) {
    return errors
       .map((error) => {
        for (const property in error.constraints) {
          return error.constraints[property];
        }
      })
      .join(', ');
  }
}
