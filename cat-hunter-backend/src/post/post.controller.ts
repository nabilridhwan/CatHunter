import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto, CreateUserDto, UpdatePostDto} from "@cat-hunter/types";
import {UseZodGuard, ZodValidationPipe} from "nestjs-zod";
import {GetAllPostsDto} from '@cat-hunter/types';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @UseZodGuard('query', GetAllPostsDto)
  @Get()
  getAllPosts(@Query() options: GetAllPostsDto) {
    return this.postService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
