import { Test, TestingModule } from '@nestjs/testing';
import { FormController } from './form.controller';
import { FormService } from './form.service';

describe('FormController', () => {
  let formController: FormController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [FormService],
    }).compile(); 
 
    formController = app.get<FormController>(FormController); 
  });
 
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(formController.getHello()).toBe('Hello World!');
    });
  });
});
