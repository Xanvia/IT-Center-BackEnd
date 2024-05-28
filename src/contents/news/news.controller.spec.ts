import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/createNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { News } from './news.entity';
import { Content } from '../content.entity';

describe('NewsController', () => {
  let newsController: NewsController;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: {
            findAll: jest.fn(),
            findbyID: jest.fn(),
            createContent: jest.fn(),
            updateContent: jest.fn(),
          },
        },
      ],
    }).compile();

    newsController = module.get<NewsController>(NewsController);
    newsService = module.get<NewsService>(NewsService);
  });

  // basic test
  it('should be defined', () => {
    expect(newsController).toBeDefined();
  });

  // function testing
  describe('findAll', () => {
    it('should return an array of News items', async () => {
      const result: Content[] = [new News()];
      jest.spyOn(newsService, 'findAll').mockResolvedValue(result);

      expect(await newsController.findAll()).toBe(result);
    });
  });

  describe('findbyID', () => {
    it('should return a single News item', async () => {
      const result = new News();
      jest.spyOn(newsService, 'findbyID').mockResolvedValue(result);

      expect(await newsController.findbyID('1')).toBe(result);
    });
  });

  describe('createNews', () => {
    it('should create a new content item', async () => {
      const createNewsDto: CreateNewsDto = {
        title: 'Test title',
        description: 'Test body',
        date: '2000:05:30',
        time: '08:00:00',
        venue: 'IT-Center',
      };
      const result: Content = new News();
      jest.spyOn(newsService, 'createContent').mockResolvedValue(result);

      expect(await newsController.createNews(createNewsDto)).toBe(result);
    });
  });

  describe('updateNews', () => {
    it('should update an existing content item', async () => {
      const updateNewsDto: UpdateNewsDto = {
        title: 'Updated title',
        description: 'Updated body',
      };
      const result = new News();
      jest.spyOn(newsService, 'updateContent').mockResolvedValue(result);

      expect(await newsController.updateNews('1', updateNewsDto)).toBe(result);
    });
  });
});
