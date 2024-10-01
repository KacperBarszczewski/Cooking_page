import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}

  async create(comment: Comment): Promise<CommentDocument> {
    const newComment = new this.commentModel(comment);
    return newComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find();
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id);

    if (!comment) throw new NotFoundException('Comment not found');

    return comment;
  }

  async updateById(id: string, comment: Comment): Promise<Comment> {
    return await this.commentModel.findByIdAndUpdate(id, comment, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Comment> {
    return await this.commentModel.findByIdAndDelete(id);
  }
}
