import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { User, UserSchema } from '../user/user.schema';
import { SeederService } from './seeder.service';
import { Article, ArticleSchema } from '../article/article.schema';
import { Comment, CommentSchema } from 'src/comment/schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
