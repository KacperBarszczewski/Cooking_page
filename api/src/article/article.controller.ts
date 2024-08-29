import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/CreateArticle.dto';
import { CreateArticleValidationPipe } from './pipes/CreateArticleValidationPipe';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UsePipes(CreateArticleValidationPipe)
  async createPost(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  async findAllArticles() {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findArticle(@Param('id') id: string) {
    return this.articleService.find(id);
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('ingredients') ingredients: string[],
    @Body('isVisible') isVisible: boolean,
    @Body('image') image: string,
  ) {
    return this.articleService.update(
      id,
      title,
      description,
      ingredients,
      isVisible,
      image,
    );
  }

  @Delete(':id')
  async delateArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
