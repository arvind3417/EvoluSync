import {
    IsNotEmpty,
    IsString,IsPhoneNumber, min, MinLength, IsNumber, MaxLength
  } from 'class-validator';

export class CreateFormDto {
   @IsString()
   @IsNotEmpty()
   name:string;

   @IsString()
   @IsNotEmpty()
   phoneNumber:string

   @IsString()
   @IsNotEmpty()
   description:string;

   @IsString()
   @IsNotEmpty()
   state:string;
}