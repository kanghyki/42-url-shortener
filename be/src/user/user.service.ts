import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateURLDto } from 'src/url/url.dto';
import { CreateUserDto } from './user.dto';
import { URL } from 'src/url/url.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(URL) private urlRepository: Repository<URL>,
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

  async createURL(id: string, url: CreateURLDto) {
    const newURL = this.urlRepository.create(url);
    const user = await this.userRepository.findOneBy({ intraID: id });
    newURL.user = user;
    return await this.urlRepository.save(newURL);
  }
}
