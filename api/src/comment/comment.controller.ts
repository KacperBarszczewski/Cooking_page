import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @Roles(Role.Admin)
  getAllComments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findById(id);
  }

  @Post()
  createComment(
    @Body() comment: CreateCommentDto,
    @Req() req,
  ): Promise<Comment> {
    return this.commentService.create(comment, req.user);
  }

  @Put(':id')
  //@UseGuards(AuthGuard())
  updateComment(@Param('id') id: string, @Body() comment: UpdateCommentDto) {
    return this.updateComment(id, comment);
  }

  @Delete(':id')
  //@UseGuards(AuthGuard())
  deleteComment(@Param('id') id: string): Promise<Comment> {
    return this.commentService.deleteById(id);
  }
}
