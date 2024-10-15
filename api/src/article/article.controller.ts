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
import { CreateArticleValidationPipe } from './pipes/CreateArticleValidation.pipe';
import { UpdateArticleDto } from './dto/UpdateArticle.dto';
import { UpdateArticleValidationPipe } from './pipes/UpdateArticleValidation.pipe';
import { Public } from '../auth/decorators/public.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UsePipes(new CreateArticleValidationPipe())
  async createPost(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  @Public()
  async findAllArticles() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  @Public()
  async findArticle(@Param('id') id: string) {
    return await this.articleService.find(id);
  }

  @Patch(':id')
  @UsePipes(new UpdateArticleValidationPipe())
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articleService.delete(id);
  }
}
