import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.schema';
import { CreateArticleDto } from './dto/CreateArticle.dto';
import { UpdateArticleDto } from './dto/UpdateArticle.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleModel.create(createArticleDto);
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async find(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const date = new Date();

    return this.articleModel
      .findByIdAndUpdate(id, { ...updateArticleDto, date }, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
