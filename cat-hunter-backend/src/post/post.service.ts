import {Injectable} from '@nestjs/common';
import {GetAllPostsDto} from '@cat-hunter/types';
import {CreatePostDto, UpdatePostDto} from "@cat-hunter/types";
import {PrismaService} from "../../prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {
  }

  async createPost(createPostDto: CreatePostDto, email: string) {
    return this.prisma.post.create({
      data: {
        caption: createPostDto.caption,
        lat: createPostDto.location.lat,
        lng: createPostDto.location.long,
        likes: 0,
        comments: 0,
        user: {
          connect: {
            email: email
          }
        }
      }
    })
  }

  async getAllPosts(options: GetAllPostsDto) {
    // TODO: Implement page cursor pagination
    const filter: Prisma.PostWhereInput = {};

    if (options.search) {
      filter.caption = {
        contains: options.search
      }
    }

    if (options.user_id) {
      filter.user_id = options.user_id
    }

    return this.prisma.post.findMany({
      where: filter,
      orderBy: {
        created_at: 'desc'
      },
    })
  }

  async findOnePost(id: string) {
    return this.prisma.post.findFirst({
      where: {
        post_id: id
      },

      select: {
        comments: true,
      }
    })
  }

  async editPost(post_id: string, updatePostDto: UpdatePostDto, email: string) {
    return this.prisma.post.update({
      data: {
        caption: updatePostDto.caption,
        lng: updatePostDto.location?.long,
        lat: updatePostDto.location?.lat
      },
      where: {
        post_id,
        user: {
          email: email
        }
      }
    })
  }

  async deletePost(id: string, email: string) {
    return this.prisma.post.delete({
      where: {
        post_id: id,
        user: {
          email: email
        }
      }
    })
  }
}
