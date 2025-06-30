import { Test, TestingModule } from '@nestjs/testing';
import { SportCenterController } from './sport_center.controller';
import { SportCenterService } from './sport_center.service';

describe('SportCenterController', () => {
  let controller: SportCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportCenterController],
      providers: [SportCenterService],
    }).compile();

    controller = module.get<SportCenterController>(SportCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
