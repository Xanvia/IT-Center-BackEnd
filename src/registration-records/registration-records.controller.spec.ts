import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationRecordsController } from './registration-records.controller';
import { RegistrationRecordsService } from './registration-records.service';

describe('RegistrationRecordsController', () => {
  let controller: RegistrationRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationRecordsController],
      providers: [RegistrationRecordsService],
    }).compile();

    controller = module.get<RegistrationRecordsController>(RegistrationRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
