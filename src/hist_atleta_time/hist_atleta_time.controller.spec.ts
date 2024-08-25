import { Test, TestingModule } from '@nestjs/testing';
import { HistAtletaTimeController } from './hist_atleta_time.controller';
import { HistAtletaTimeService } from './hist_atleta_time.service';

describe('HistAtletaTimeController', () => {
  let controller: HistAtletaTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistAtletaTimeController],
      providers: [HistAtletaTimeService],
    }).compile();

    controller = module.get<HistAtletaTimeController>(HistAtletaTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
