import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/CreateArticle.dto';
import { UpdateArticleDto } from './dto/UpdateArticle.dto';

describe('ArticleController', () => {
  let articleService: ArticleService;
  let articleController: ArticleController;

  const mockArticle = {
    _id: '66d07bc074e089063b00bbda',
    title: 'Pierogi',
    description: 'Zrobić pierogi',
    ingredients: ['jajka', 'mleko'],
    isVisible: true,
    image: 'test-image.jpg',
    date: new Date('2022-02-22T22:22:40.260Z'),
    __v: 0,
  };

  const mockArticleService = {
    findAll: jest.fn().mockResolvedValueOnce([mockArticle]),
    create: jest.fn(),
    find: jest.fn().mockResolvedValueOnce(mockArticle),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValueOnce({ delete: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: mockArticleService,
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
    articleController = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(articleController).toBeDefined();
  });

  describe('getAllArticles', () => {
    it('should get all articles', async () => {
      const result = await articleController.findAllArticles();

      expect(mockArticleService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockArticle]);
    });
  });

  describe('createArticle', () => {
    it('should create a new article', async () => {
      const dto: CreateArticleDto = {
        title: 'Pierogi',
        description: 'Zrobić pierogi',
        ingredients: ['jajka', 'mleko'],
        isVisible: true,
        image: 'test-image.jpg',
      };

      mockArticleService.create = jest.fn().mockResolvedValueOnce(mockArticle);

      const result = await articleController.createPost(dto);

      expect(mockArticleService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockArticle);
    });
  });

  describe('getArticleById', () => {
    it('should get article by ID', async () => {
      const result = await articleController.findArticle(mockArticle._id);

      expect(mockArticleService.find).toHaveBeenCalled();
      expect(result).toEqual(mockArticle);
    });
  });

  describe('updateArticle', () => {
    it('should update article by its ID', async () => {
      const updateArticleDto: UpdateArticleDto = {
        description: 'updated description',
        ingredients: ['updated ingredient1', 'updated ingredient2'],
        isVisible: false,
        image: 'updatedImage.png',
      };
      const updatedArticle = { ...mockArticle, ...updateArticleDto };

      mockArticleService.update = jest
        .fn()
        .mockResolvedValueOnce(updatedArticle);

      const result = await articleController.updateArticle(
        mockArticle._id,
        updateArticleDto,
      );

      expect(articleService.update).toHaveBeenCalledWith(
        mockArticle._id,
        updateArticleDto,
      );
      expect(result).toEqual(updatedArticle);
    });
  });

  describe('deleteArticle', () => {
    it('should delete a article by ID', async () => {
      const result = await articleController.deleteArticle(mockArticle._id);

      expect(articleService.delete).toHaveBeenCalledWith(mockArticle._id);
      expect(result).toEqual({ delete: true });
    });
  });
});
