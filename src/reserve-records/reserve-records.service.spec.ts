import { Test, TestingModule } from '@nestjs/testing';
import { ReserveRecordsService } from './reserve-records.service';

describe('ReserveRecordsService', () => {
  let service: ReserveRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReserveRecordsService],
    }).compile();

    service = module.get<ReserveRecordsService>(ReserveRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
