import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.schema';
import { CreateArticleDto } from './dto/CreateArticle.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const newArticle = new this.articleModel(createArticleDto);
    return newArticle.save();
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async find(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }

  async update(
    id: string,
    newTitle: string,
    newDescription: string,
    newIngredients: string[],
    newIsVisible: boolean,
    newImage: string,
  ): Promise<Article> {
    const existingArticle = await this.find(id);

    existingArticle.title = newTitle ?? existingArticle.title;
    existingArticle.description = newDescription ?? existingArticle.description;
    existingArticle.ingredients = newIngredients ?? existingArticle.ingredients;
    existingArticle.isVisible = newIsVisible ?? existingArticle.isVisible;
    existingArticle.image = newImage ?? existingArticle.image;
    existingArticle.date = new Date();

    return this.articleModel.findByIdAndUpdate(id, existingArticle).exec();
  }

  async delete(id: string) {
    return this.articleModel.deleteOne({ _id: id }).exec();
  }
}
