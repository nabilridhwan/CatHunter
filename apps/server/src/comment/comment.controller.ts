import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {CommentService} from './comment.service';
import {CreateCommentDto, UpdateCommentDto} from '@cat-hunter/types';
import {AuthGuard} from '../auth.guard';
import {ZodValidationPipe} from 'nestjs-zod';
import {UserEmail} from '../user-email.decorator';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {
  }

  @Post(':post_id')
  @UseGuards(AuthGuard)
  @UsePipes(ZodValidationPipe)
  create(
    @Param('post_id') post_id: string,
    @Body() createCommentDto: CreateCommentDto,
    @UserEmail() userEmail: string
  ) {
    return this.commentService.createComment(
      post_id,
      createCommentDto,
      userEmail
    );
  }

  @Patch(':comment_id')
  @UseGuards(AuthGuard)
  @UsePipes(ZodValidationPipe)
  update(
    @Param('comment_id') comment_id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @UserEmail() userEmail: string
  ) {
    return this.commentService.editComment(
      comment_id,
      updateCommentDto,
      userEmail
    );
  }

  @Delete(':comment_id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('comment_id') comment_id: string,
    @UserEmail() userEmail: string
  ) {
    console.log(comment_id, userEmail);
    return this.commentService.deleteComment(comment_id, userEmail);
  }
}
