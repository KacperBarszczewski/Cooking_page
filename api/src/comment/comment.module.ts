import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../article/article.module';
import { ArticleService } from '../article/article.service';

@Module({
  imports: [
    AuthModule,
    ArticleModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService, ArticleService],
})
export class CommentModule {}
