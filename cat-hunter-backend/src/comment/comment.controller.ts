import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CreateCommentDto, UpdateCommentDto} from "@cat-hunter/types";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findCommentByPostId();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.editComment(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.deleteComment(+id);
  }
}
