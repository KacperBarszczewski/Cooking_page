import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.schema';

const articleStub: Article = {
  title: 'Title test',
  description: 'Description test',
  ingredients: ['ingredient1', 'ingredients2'],
  isVisible: true,
  date: new Date(),
  image: 'ImageBase64String',
};

const mockArticleService = {
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delate: jest.fn(),
};

describe('ArticleController', () => {
  let controller: ArticleController;

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

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create a new article', async () => {
  //   const dto = {
  //     title: 'Test Title',
  //     description: 'Test Description',
  //     ingredients: ['Ingredient 1', 'Ingredient 2'],
  //     isVisible: true,
  //     image: 'image.png',
  //   };
  //   await controller.createPost(
  //     dto.title,
  //     dto.description,
  //     dto.ingredients,
  //     dto.isVisible,
  //     dto.image,
  //   );
  //   expect(mockArticleService.create).toHaveBeenCalledWith(
  //     dto.title,
  //     dto.description,
  //     dto.ingredients,
  //     dto.isVisible,
  //     dto.image,
  //   );
  // });

  // it('should return all articles', async () => {
  //   await controller.findAllArticles();
  //   expect(mockArticleService.findAll).toHaveBeenCalled();
  // });

  // it('should return a specific article', async () => {
  //   const id = '1';
  //   await controller.findArticle(id);
  //   expect(mockArticleService.find).toHaveBeenCalledWith(id);
  // });

  // it('should delete a specific article', async () => {
  //   const id = '1';
  //   await controller.delateArticle(id);
  //   expect(mockArticleService.delate).toHaveBeenCalledWith(id);
  // });
});
