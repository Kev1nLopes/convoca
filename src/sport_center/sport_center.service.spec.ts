import { Test, TestingModule } from '@nestjs/testing';
import { SportCenterService } from './sport_center.service';

describe('SportCenterService', () => {
  let service: SportCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportCenterService],
    }).compile();

    service = module.get<SportCenterService>(SportCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
