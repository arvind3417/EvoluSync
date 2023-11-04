import { Body, Controller, Get, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { ValidateDTO } from './dto/form.dto';


@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  getHello(): string {
    return this.formService.getHello();
  }
  @Post('submit-form')
  submitForm(@Body() dto:ValidateDTO){
    try{
     const res= this.formService.createTodo(dto);
      return res;
      

    }catch(e){
      return (e)
    }
  }
}
