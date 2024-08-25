import { Test, TestingModule } from '@nestjs/testing';
import { HistAtletaTimeService } from './hist_atleta_time.service';

describe('HistAtletaTimeService', () => {
  let service: HistAtletaTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistAtletaTimeService],
    }).compile();

    service = module.get<HistAtletaTimeService>(HistAtletaTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
