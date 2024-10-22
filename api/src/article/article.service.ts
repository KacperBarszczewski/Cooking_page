import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.schema';
import { CreateArticleDto } from './dto/CreateArticle.dto';
import { UpdateArticleDto } from './dto/UpdateArticle.dto';
import { CurrentUser } from '../auth/types/current-user';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    user: CurrentUser,
  ): Promise<Article> {
    const data = { ...createArticleDto, user: user.id };

    return this.articleModel.create(data);
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().populate({
      path: 'comments',
      populate: { path: 'user', select: 'name email role' },
    });
  }

  async find(id: string): Promise<Article> {
    return this.articleModel.findById(id).populate('comments');
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
