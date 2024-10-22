import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Article } from '../article/article.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../auth/types/current-user';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(
    comment: CreateCommentDto,
    user: CurrentUser,
  ): Promise<CommentDocument> {
    const data = Object.assign(comment, { user: user.id });

    const newComment = new this.commentModel(data);
    const savedComment = newComment.save();

    await this.articleModel.findByIdAndUpdate(newComment.article_id, {
      $push: { comments: newComment._id },
    });

    return savedComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().populate('user', 'name email');
  }

  async findById(id: string): Promise<Comment> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new BadRequestException('Incorrect ID');

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
    const deletedComment = await this.commentModel.findByIdAndDelete(id);

    if (!deletedComment) throw new NotFoundException('Comment not found');

    await this.articleModel.findByIdAndUpdate(deletedComment.article_id, {
      $pull: { comments: id },
    });

    return deletedComment;
  }
}
