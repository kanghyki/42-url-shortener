import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Register42UserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createNewUser(req: Register42UserDto): Promise<object> {
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
    return { ok: true, msg: 'Create User' };
  }

  async getUser(id: string) {
    const find = await this.userRepository.find({
      relations: {
        urls: true,
      },
      where: {
        userID: id,
      },
    });
    find.map((user) => {
      user.token = undefined;
      user.id = undefined;
      user.password = undefined;
      user.urls.map((url) => (url.id = undefined));
    });
    if (find.length > 0) {
      return { ok: true, msg: 'Get User', result: find };
    }
    return { ok: false, msg: 'Failed to get user' };
  }

  async UpdateUser(req: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ userID: req.userID });
    if (user && (await bcrypt.compare(req.oldPassword, user.password))) {
      const hashPW = await bcrypt.hash(req.newPassword, 10);
      user.password = hashPW;
      await this.userRepository.save(user);
      return { ok: true, msg: 'Update User' };
    }
    return { ok: false, msg: 'Failed to update user' };
  }

  async deleteUser(userID: string) {
    const ret = await this.userRepository.delete({ userID: userID });
    if (ret.affected > 0) {
      return { ok: true, msg: 'Delete User' };
    }
    return { ok: false, msg: 'Failed to delete user' };
  }
}
