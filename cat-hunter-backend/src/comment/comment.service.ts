import {Injectable} from '@nestjs/common';
import {CreateCommentDto, UpdateCommentDto} from "@cat-hunter/types";
import {PrismaService} from "../../prisma.service";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {
  }

  async createComment(post_id: string, createCommentDto: CreateCommentDto, email: string) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.postComments.create({
        data: {
          comment: createCommentDto.content,
          post: {
            connect: {
              post_id: post_id
            }
          },
          user: {
            connect: {
              email: email
            }
          }
        }
      })

      await prisma.post.update({
        where: {
          post_id: post_id
        },
        data: {
          comments: {
            increment: 1
          }
        }
      })
    });

  }

  findCommentsByPostId(post_id: string) {
    return this.prisma.postComments.findMany({
      where: {
        post: {
          post_id: post_id
        }
      }
    })
  }

  editComment(comment_id: string, updateCommentDto: UpdateCommentDto, email: string) {
    return this.prisma.postComments.update({
      where: {
        comment_id: comment_id,
        user: {
          email: email
        }
      },
      data: {
        comment: updateCommentDto.content
      }
    })
  }

  deleteComment(id: string, email: string) {
    return this.prisma.$transaction(async (prisma) => {
      const comment = await prisma.postComments.delete({
        where: {
          comment_id: id,
          user: {
            email: email
          }
        }
      })

      await prisma.post.update({
        where: {
          post_id: comment.post_id
        },
        data: {
          comments: {
            decrement: 1
          }
        }
      })
    });
  }
}
