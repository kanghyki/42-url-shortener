import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(intraID: string): Promise<User> {
    return await this.userRepository.findOneBy({
      intraID: intraID,
    });
  }

  async createNewUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    const ret = await this.userRepository.save(newUser);
    ret.id = undefined;
    return ret;
  }

  async findUser(id: string): Promise<User[]> {
    const find = await this.userRepository.find({
      relations: {
        urls: true,
      },
      where: {
        intraID: id,
      },
    });
    find.map((user) => {
      user.id = undefined;
      user.urls.map((url) => (url.id = undefined));
    });
    return find;
  }

  async deleteUser(id: string) {
    return await this.userRepository.delete({ intraID: id });
  }
}
