import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './article.schema';
import { ValidateArticleExistsMiddleware } from './middleware/validateArticle.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateArticleExistsMiddleware)
      .forRoutes(
        { path: 'article/:id', method: RequestMethod.GET },
        { path: 'article/:id', method: RequestMethod.PATCH },
        { path: 'article/:id', method: RequestMethod.DELETE },
      );
  }
}
