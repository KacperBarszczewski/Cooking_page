import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from './comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(
    name: string,
    text: string,
    article_id: string,
    isVisible: boolean,
  ): Promise<CommentDocument> {
    const newComment = new this.commentModel({
      name,
      text,
      article_id,
      isVisible,
    });
    return newComment.save();
  }

  async findAll(): Promise<CommentDocument[]> {
    return this.commentModel.find().exec();
  }

  async find(a_id: string): Promise<CommentDocument[]> {
    return this.commentModel.find({ article_id: a_id }).exec();
  }
}
