import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAllComments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @Body() comment: CreateCommentDto,
    @Req() req,
  ): Promise<Comment> {
    console.log(req.user);
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
