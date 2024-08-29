import { BadRequestException } from '@nestjs/common';
import { CreateArticleDto } from '../dto/CreateArticle.dto';
import { CreateArticleValidationPipe } from './CreateArticleValidationPipe';

describe('CreateArticleValidationPipe', () => {
  let pipe: CreateArticleValidationPipe;

  beforeEach(() => {
    pipe = new CreateArticleValidationPipe();
  });

  it('should throw an error if title is missing or not a non-empty string', () => {
    const testCases = [
      { title: undefined, description: 'desc' },
      { title: '', description: 'desc' },
      { title: 123 as any, description: 'desc' },
      { title: {} as any, description: 'desc' },
    ];

    testCases.forEach((testCase) => {
      expect(() => pipe.transform(testCase as CreateArticleDto)).toThrow(
        new BadRequestException([
          'Title is required and must be a non-empty string',
        ]),
      );
    });
  });

  it('should throw an error if description is missing or not a non-empty string', () => {
    const testCases = [
      { title: 'title', description: undefined },
      { title: 'title', description: '' },
      { title: 'title', description: 123 as any },
      { title: 'title', description: {} as any },
    ];

    testCases.forEach((testCase) => {
      expect(() => pipe.transform(testCase as CreateArticleDto)).toThrow(
        new BadRequestException([
          ['Description is required and must be a non-empty string'],
        ]),
      );
    });
  });

  it('should throw an error if ingredients is not an array of strings', () => {
    const testCases = [
      { ingredients: 123 as any, title: 'title', description: 'desc' },
      { ingredients: {} as any, title: 'title', description: 'desc' },
      {
        ingredients: ['string', 123] as any,
        title: 'title',
        description: 'desc',
      },
    ];

    testCases.forEach((testCase) => {
      expect(() => pipe.transform(testCase as CreateArticleDto)).toThrow(
        new BadRequestException(['Ingredients must be an array']),
      );
    });

    expect(() =>
      pipe.transform({
        ingredients: ['valid', 'strings'],
        title: 'title',
        description: 'desc',
      } as CreateArticleDto),
    ).not.toThrow();
  });

  it('should throw an error if isVisible is not a boolean', () => {
    const testCases = [
      { isVisible: 'true' as any, title: 'title', description: 'desc' },
      { isVisible: 1 as any, title: 'title', description: 'desc' },
      { isVisible: {} as any, title: 'title', description: 'desc' },
    ];

    testCases.forEach((testCase) => {
      expect(() => pipe.transform(testCase as CreateArticleDto)).toThrow(
        new BadRequestException(['isVisible must be a boolean']),
      );
    });

    expect(() =>
      pipe.transform({
        isVisible: true,
        title: 'title',
        description: 'desc',
      } as CreateArticleDto),
    ).not.toThrow();
  });

  it('should throw an error if image is not a string', () => {
    const testCases = [
      { image: 123 as any, title: 'title', description: 'desc' },
      { image: {} as any, title: 'title', description: 'desc' },
    ];

    testCases.forEach((testCase) => {
      expect(() => pipe.transform(testCase as CreateArticleDto)).toThrow(
        new BadRequestException(['Image must be a string']),
      );
    });

    expect(() =>
      pipe.transform({
        image: 'valid-image.jpg',
        title: 'title',
        description: 'desc',
      } as CreateArticleDto),
    ).not.toThrow();
  });

  it('should not throw errors for valid data', () => {
    expect(() =>
      pipe.transform({
        title: 'Valid Title',
        description: 'Valid Description',
        ingredients: ['ingredient1', 'ingredient2'],
        isVisible: true,
        image: 'valid-image.jpg',
      } as CreateArticleDto),
    ).not.toThrow();
  });
});
