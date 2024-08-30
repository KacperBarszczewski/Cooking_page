import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { ArticleService } from '../article.service';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class ValidateArticleExistsMiddleware implements NestMiddleware {
  constructor(private readonly articleService: ArticleService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }

    const article = await this.articleService.find(id);
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    next();
  }
}
