import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from "../auth.guard";
import {UserEmail} from "../user-email.decorator";
import {ZodValidationPipe} from "nestjs-zod";
import {CreateUserDto} from '@cat-hunter/types';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @UsePipes(ZodValidationPipe)
  @UseGuards(AuthGuard)
  /**
   * API Route to create user (used for onboarding)
   * @param createUserDto - the user details
   * @param userEmail - the email of the user from the JWT token
   */
  create(@Body() createUserDto: CreateUserDto, @UserEmail() userEmail: string) {
    return this.userService.create(createUserDto, userEmail);
  }


  @UseGuards(AuthGuard)
  @Get()
  /**
   * API Route to get the user details by email (basically a /api/me route). Includes sensitive information.
   * @param userEmail
   */
  findMe(@UserEmail() userEmail: string) {
    return this.userService.findByEmail(userEmail);
  }

  @Get(':id')
  /**
   * API Route to get the user details by id. Doesn't include sensitive information.
   * @param id
   */
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @UserEmail() userEmail: string) {
    return this.userService.update(+id, userEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
