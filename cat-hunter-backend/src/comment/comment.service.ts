import {Injectable} from '@nestjs/common';
import {CreateCommentDto, UpdateCommentDto} from "@cat-hunter/types";

@Injectable()
export class CommentService {
  createComment(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findCommentByPostId() {
    return `This action returns all comment`;
  }

  editComment(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  deleteComment(id: number) {
    return `This action removes a #${id} comment`;
  }
}
