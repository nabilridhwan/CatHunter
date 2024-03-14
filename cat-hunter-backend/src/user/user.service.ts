import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "../../../@cathunt/types/src/lib/user.dto";

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto, email: string) {
    console.log(createUserDto, email)
    return 'This action adds a new user';
  }

  findByEmail(email: string) {
    return `This action returns the user with email address of ${email}`;
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
