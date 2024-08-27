import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { ArticleDocument } from './article.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article')
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async create(
    title: string,
    description: string,
    ingredients: string[],
    isVisible: boolean,
    image: string,
  ): Promise<ArticleDocument> {
    const newArticle = new this.articleModel({
      title,
      description,
      ingredients,
      isVisible,
      image,
    });
    return newArticle.save();
  }

  async findAll(): Promise<ArticleDocument[]> {
    return this.articleModel.find().exec();
  }

  async find(id: string): Promise<ArticleDocument> {
    return this.articleModel.findById(id).exec();
  }

  async update(
    id: string,
    newTitle: string,
    newDescription: string,
    newIngredients: string[],
    newIsVisible: boolean,
    newImage: string,
    newDate: Date,
  ): Promise<ArticleDocument> {
    const existingArticle = await this.find(id);

    existingArticle.title = newTitle ?? existingArticle.title;
    existingArticle.description = newDescription ?? existingArticle.description;
    existingArticle.ingredients = newIngredients ?? existingArticle.ingredients;
    existingArticle.isVisible = newIsVisible ?? existingArticle.isVisible;
    existingArticle.image = newImage ?? existingArticle.image;
    existingArticle.date = newDate;

    return existingArticle.save();
  }

  async delate(id: string) {
    return this.articleModel.deleteOne({ _id: id }).exec();
  }
}
