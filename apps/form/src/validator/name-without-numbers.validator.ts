// custom-validators/name-without-numbers.validator.ts
import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
  } from 'class-validator';
  
  export function NameWithoutNumbers(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'nameWithoutNumbers',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (typeof value !== 'string') {
              return true; // Non-string values are considered valid
            }
            return !/\d/.test(value); // Check if value contains any digit
          },
        },
      });
    };
  }
  