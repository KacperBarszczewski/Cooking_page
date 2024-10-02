import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from '../article/article.schema';
import * as fs from 'fs';
import * as path from 'path';
import { Comment, CommentDocument } from '../comment/schemas/comment.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async seed() {
    const imageBase64 = fs.readFileSync(
      path.join(__dirname, '..', '..', 'assets', 'base64Pierogi.txt'),
      'utf8',
    );

    const users = [
      {
        name: 'root',
        email: 'root@root.com',
        password:
          '$2b$12$4cZKDhgVJoVmq9EWhJJxeuyeHzfoeaFl/7LT1GJ6sHqSc0SoV3Xrm',
        isAdmin: true,
      },
      {
        name: 'Jon',
        email: 'jon@test.com',
        password:
          '$2b$12$S0T9Vr5.9QP3urasG3Pq7OsuJVJxPKBIgyZJ8nT4tSAz394MKp2dO',
        isAdmin: false,
      },
    ];

    const article = {
      title: 'Pierogi3',
      description: 'Zrobić pierogi',
      ingredients: ['jajka', 'mleko'],
      isVisible: true,
      image: imageBase64,
    };

    const comments = [
      { name: 'Kacper', text: 'test', isVisible: true },
      { name: 'Kacper', text: 'test', isVisible: true },
    ];

    const existingRoot = await this.userModel
      .findOne({ email: users[0].email })
      .exec();

    if (!existingRoot) {
      for (const user of users) {
        await this.userModel.create(user);
      }

      const createdArticle = new this.articleModel(article);
      createdArticle.save();

      for (const comment of comments) {
        new this.commentModel({
          name: comment.name,
          text: comment.text,
          article_id: createdArticle.id,
          isVisible: comment.isVisible,
        }).save();
      }
    }
  }
}
