// import {
//     IsNotEmpty,
//     IsString,IsPhoneNumber, min, MinLength, IsNumber, MaxLength
//   } from 'class-validator';

// export class CreateFormDto {
//    @IsString()
//    @IsNotEmpty()
//    name:string;

//    @IsString()
//    @IsNotEmpty()
//    phoneNumber:string

//    @IsString()
//    @IsNotEmpty()
//    description:string;

//    @IsString()
//    @IsNotEmpty()
//    state:string;
// }

// validate.dto.ts
import { IsString, IsPhoneNumber, MaxLength, IsAlphanumeric } from 'class-validator';
import { NameWithoutNumbers } from '../validator/name-without-numbers.validator';

export class ValidateDTO {
  @IsString({ message: 'Name must be a string' })
  @MaxLength(150, { message: 'Name cannot exceed 150 characters' })
  @NameWithoutNumbers({ message: 'Name cannot contain numbers' })
    name: string;

  @IsPhoneNumber('IN', { message: 'Invalid phone number' })
  phoneNumber: string;

  @IsString({ message: 'State must be a string' })
  state: string;

  @IsString({ message: 'Description must be a string' })
  @MaxLength(200, { message: 'Description cannot exceed 200 characters' })
  description: string;
}
