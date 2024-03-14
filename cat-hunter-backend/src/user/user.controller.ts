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
  HttpException,
  NotFoundException
} from '@nestjs/common';
import {UserService} from './user.service';
import {AuthGuard} from "../auth.guard";
import {UserEmail} from "../user-email.decorator";
import {ZodValidationPipe} from "nestjs-zod";
import {CreateUserDto, UpdateUserDto} from '@cat-hunter/types';

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
    try {

      return this.userService.create(createUserDto, userEmail);
    } catch (e) {

      if (e instanceof HttpException) {
        return e;
      }

      throw new HttpException('Something went wrong', 500);
    }
  }


  @UseGuards(AuthGuard)
  @Get()
  /**
   * API Route to get the user details by email (basically a /api/me route). Includes sensitive information.
   * @param userEmail
   */
  async findMe(@UserEmail() userEmail: string) {

    const user = await this.userService.findByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }

  @Get(':id')
  /**
   * API Route to get the user details by id. Doesn't include sensitive information.
   * @param id
   */
  async findOne(@Param('id') id: string) {
    const u = await this.userService.findOne(id);
    console.log(u)
    return u;
  }

  @UseGuards(AuthGuard)
  @UsePipes(ZodValidationPipe)
  @Patch()
  /**
   * Update current user details
   * @param updateUserDto
   * @param userEmail
   */
  update(@Body() updateUserDto: UpdateUserDto, @UserEmail() userEmail: string) {
    return this.userService.update(updateUserDto, userEmail);
  }

  @UseGuards(AuthGuard)
  @Delete()
  remove(@UserEmail() userEmail: string) {
    return this.userService.deleteUser(userEmail);
  }
}
