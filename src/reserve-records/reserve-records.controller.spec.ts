import { Test, TestingModule } from '@nestjs/testing';
import { ReserveRecordsController } from './reserve-records.controller';
import { ReserveRecordsService } from './reserve-records.service';

describe('ReserveRecordsController', () => {
  let controller: ReserveRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReserveRecordsController],
      providers: [ReserveRecordsService],
    }).compile();

    controller = module.get<ReserveRecordsController>(ReserveRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
