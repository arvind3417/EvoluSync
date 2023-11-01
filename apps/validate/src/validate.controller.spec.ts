import { Test, TestingModule } from '@nestjs/testing';
import { ValidateController } from './validate.controller';
import { ValidateService } from './validate.service';

describe('ValidateController', () => {
  let validateController: ValidateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ValidateController],
      providers: [ValidateService],
    }).compile();

    validateController = app.get<ValidateController>(ValidateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(validateController.getHello()).toBe('Hello World!');
    });
  });
});
