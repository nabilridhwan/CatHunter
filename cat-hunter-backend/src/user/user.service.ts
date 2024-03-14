import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {CreateUserDto, UpdateUserDto} from '@cat-hunter/types';
import {PrismaService} from "../../prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {UserEmail} from "../user-email.decorator";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async create(createUserDto: CreateUserDto, email: string) {
    console.log(createUserDto, email)
    try {
      return this.prisma.user.create({
        data: {
          name: createUserDto.name,
          username: createUserDto.username,
          bio: createUserDto.bio,
          location: createUserDto.country,
          email
        }
      })
    } catch (e) {
      console.log(e)
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException(e.meta)
        }
      }

      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        user_id: id
      },
      select: {
        user_id: true,
        name: true,
        username: true,
        bio: true,
      }
    })
  }

  async update(updateUserDto: UpdateUserDto, @UserEmail() userEmail: string) {
    return this.prisma.user.update({
      where: {
        email: userEmail
      },
      data: {
        ...updateUserDto
      },
    })
  }

  async deleteUser(email: string) {
    return this.prisma.user.delete({
      where: {
        email
      }
    })
  }
}
