import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  UseGuards,
  NotFoundException
} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto, UpdatePostDto} from "@cat-hunter/types";
import {UseZodGuard, ZodValidationPipe} from "nestjs-zod";
import {GetAllPostsDto} from '@cat-hunter/types';
import {UserEmail} from "../user-email.decorator";
import {AuthGuard} from "../auth.guard";

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ZodValidationPipe)
  create(@Body() createPostDto: CreatePostDto, @UserEmail() userEmail: string) {
    return this.postService.createPost(createPostDto, userEmail);
  }

  @UseZodGuard('query', GetAllPostsDto)
  @Get()
  getAllPosts(@Query() options: GetAllPostsDto) {
    return this.postService.getAllPosts(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOnePost(id);
  }

  @Patch(':id')
  @UsePipes(ZodValidationPipe)
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @UserEmail() userEmail: string) {
    return this.postService.editPost(id, updatePostDto, userEmail);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @UserEmail() userEmail: string) {
    try {
      return this.postService.deletePost(id, userEmail);
    } catch (e) {
      throw new NotFoundException(e.message)
    }
  }
}
