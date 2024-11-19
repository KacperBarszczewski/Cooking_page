import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CurrentUser } from '../auth/types/current-user';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private articleService: ArticleService,
  ) {}

  async create(
    comment: CreateCommentDto,
    user: CurrentUser,
  ): Promise<CommentDocument> {
    const data = Object.assign(comment, { user: user.id });

    const newComment = new this.commentModel(data);
    const savedComment = await newComment.save();

    this.articleService.addCommentIdByArticleID(
      comment.article_id,
      savedComment.id,
    );

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

    this.articleService.deleteCommentIdByArticleID(
      deletedComment.article_id.toString(),
      id,
    );

    return deletedComment;
  }
}
