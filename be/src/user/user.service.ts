import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createNewUser(req: UserDto): Promise<object> {
    const user = await this.userRepository.findOneBy({
      userID: req.userID,
    });
    if (user !== null) {
      return { ok: false, msg: 'Already exist account' };
    }
    const hashPW = await bcrypt.hash(req.password, 10);
    req.password = hashPW;
    const newUser = this.userRepository.create(req);
    await this.userRepository.save(newUser);
    return { ok: true, msg: newUser };
  }

  async getUser(id: string): Promise<User[]> {
    const find = await this.userRepository.find({
      relations: {
        urls: true,
      },
      where: {
        userID: id,
      },
    });
    find.map((user) => {
      user.id = undefined;
      user.password = undefined;
      user.urls.map((url) => (url.id = undefined));
    });
    return find;
  }

  async deleteUser(req: UserDto) {
    await this.userRepository.delete({ userID: req.userID });
    return { ok: true, msg: 'Deleted' };
  }
}
