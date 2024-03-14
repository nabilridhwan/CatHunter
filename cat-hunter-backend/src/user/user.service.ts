import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {CreateUserDto} from '@cat-hunter/types';
import {PrismaService} from "../../prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {
  }

  async create(createUserDto: CreateUserDto, email: string) {
    console.log(createUserDto, email)
    try {

      const res = await this.prisma.user.create({
        data: {
          name: createUserDto.name,
          username: createUserDto.username,
          bio: createUserDto.bio,
          location: createUserDto.country,
          email
        }
      })
      return res;
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, userEmail: string) {
    return `This action updates the user with email address of ${userEmail}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
