import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleDocument } from './article.schema';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  createPost(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('ingredients') ingredients: string[],
    @Body('isVisible') isVisible: boolean,
    @Body('image') image: string,
  ): Promise<ArticleDocument> {
    return this.articleService.create(
      title,
      description,
      ingredients,
      isVisible,
      image,
    );
  }

  @Get()
  findAllArticles(): Promise<ArticleDocument[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  findArticle(@Param('id') id: string): Promise<ArticleDocument> {
    return this.articleService.find(id);
  }

  @Patch(':id')
  updateArticle(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('ingredients') ingredients: string[],
    @Body('isVisible') isVisible: boolean,
    @Body('image') image: string,
    date: Date,
  ): Promise<ArticleDocument> {
    return this.articleService.update(
      id,
      title,
      description,
      ingredients,
      isVisible,
      image,
      date,
    );
  }

  @Delete(':id')
  delateArticle(@Param('id') id: string) {
    return this.articleService.delate(id);
  }
}
