import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAllComments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findById(id);
  }

  @Post()
  createPost(@Body() comment: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(comment);
  }

  @Put(':id')
  updateComment(@Param('id') id: string, @Body() comment: UpdateCommentDto) {
    return this.updateComment(id, comment);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.deleteById(id);
  }
}
