import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUser(id: string): Promise<User> {
    const ret = await this.userRepository.findOneBy({ intraID: id });
    return ret;
  }

  async createNewUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    const ret = await this.userRepository.save(newUser);
    return ret;
  }

  async deleteUser(id: string) {
    const ret = await this.userRepository.delete({ intraID: id });
    return ret;
  }
}
