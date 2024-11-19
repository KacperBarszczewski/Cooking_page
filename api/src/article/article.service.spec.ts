import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { getModelToken } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './article.schema';
import { Model, Types } from 'mongoose';
import { CreateArticleDto } from './dto/CreateArticle.dto';
import { UpdateArticleDto } from './dto/UpdateArticle.dto';

describe('ArticleService', () => {
  let articleService: ArticleService;
  let model: Model<ArticleDocument>;

  const mockArticle = {
    _id: new Types.ObjectId('66d07bc074e089063b00bbda'),
    title: 'Pierogi',
    description: 'Zrobić pierogi',
    ingredients: ['jajka', 'mleko'],
    isVisible: true,
    image: 'test-image.jpg',
    date: new Date('2024-08-29T13:46:40.260Z'),
    __v: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken(Article.name),
          useValue: {
            findById: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
    model = module.get<Model<ArticleDocument>>(getModelToken(Article.name));
  });

  it('should be defined', () => {
    expect(articleService).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an article', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockArticle));

      const dto: CreateArticleDto = {
        title: 'Pierogi',
        description: 'Zrobić pierogi',
        ingredients: ['jajka', 'mleko'],
        isVisible: true,
        image: 'test-image.jpg',
      };
      const result = await articleService.create(dto);

      expect(result).toEqual(mockArticle);
      expect(model.create).toHaveBeenCalledTimes(1);
      expect(model.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findByID', () => {
    it('should find and return an article by ID', async () => {
      jest.spyOn(model, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockArticle),
      } as any);

      const result = await articleService.find(mockArticle._id.toString());

      expect(model.findById).toHaveBeenCalledWith(mockArticle._id.toString());
      expect(result).toEqual(mockArticle);
    });
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockArticle, mockArticle]),
      } as any);

      const result = await articleService.findAll();

      expect(result).toEqual([mockArticle, mockArticle]);
      expect(model.find).toHaveBeenCalledTimes(1);
    });

    it('should return empty table', async () => {
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue([]),
      } as any);

      const result = await articleService.findAll();

      expect(result).toEqual([]);
      expect(model.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update and return the updated article', async () => {
      const updateDto: UpdateArticleDto = {
        description: 'Zaktualizowany opis',
        ingredients: ['mleko'],
        isVisible: true,
        image: 'updated-image.jpg',
      };
      const updatedArticle = { ...mockArticle, ...updateDto };

      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedArticle),
      } as any);

      const result = await articleService.update(
        mockArticle._id.toString(),
        updateDto,
      );

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockArticle._id.toString(),
        expect.objectContaining(updateDto),
        { new: true },
      );
      expect(result).toEqual(updatedArticle);
    });
  });

  describe('delete', () => {
    it('should delete article by ID', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      } as any);

      const result = await articleService.delete(mockArticle._id.toString());

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(
        mockArticle._id.toString(),
      );
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
