import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationRecordsService } from './registration-records.service';

describe('RegistrationRecordsService', () => {
  let service: RegistrationRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationRecordsService],
    }).compile();

    service = module.get<RegistrationRecordsService>(RegistrationRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
