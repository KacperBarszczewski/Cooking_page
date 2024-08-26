import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { SeederModule } from './seeders/seeder.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://localhost:27017/articles'),
    ArticleModule,
    UserModule,
    AuthModule,
    CommentModule,
    SeederModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
