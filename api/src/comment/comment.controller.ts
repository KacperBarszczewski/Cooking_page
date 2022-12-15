import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentDocument } from './comment.schema';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createPost(
    @Body('name') name: string,
    @Body('text') text: string,
    @Body('article_id') article_id: string,
    @Body('isVisible') isVisible: boolean,
  ): Promise<CommentDocument>{
    return this.commentService.create(name,text,article_id,isVisible);
  }


  @Get(':article_id')
  findArticle(@Param('article_id') article_id:string): Promise<CommentDocument[]>{
    return this.commentService.find(article_id);
  }
}
