import {Injectable} from '@nestjs/common';
import {GetAllPostsDto} from '@cat-hunter/types';
import {CreatePostDto, UpdatePostDto} from "@cat-hunter/types";
import {PrismaService} from "../../prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll(options: GetAllPostsDto) {
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
      where: filter
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
