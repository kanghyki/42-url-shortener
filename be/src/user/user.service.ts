import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteUserDto, UserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(userID: string): Promise<User> {
    return await this.userRepository.findOneBy({
      userID: userID,
    });
  }

  async createNewUser(req: UserDto): Promise<boolean> {
    const hashPW = await bcrypt.hash(req.password, 10);
    req.password = hashPW;
    const newUser = this.userRepository.create(req);
    await this.userRepository.save(newUser);
    return true;
  }

  async loginUser(req: UserDto): Promise<object> {
    const user = await this.getUser(req.userID);
    if (user === null) {
      return { ok: false, token: null, msg: "Doesn't exist user" };
    }
    const isOK = await bcrypt.compare(req.password, user.password);
    if (isOK === true) {
      return { ok: true, token: 'Temporary token', msg: null };
    }
    return { ok: false, token: null, msg: 'Incorrect password' };
  }

  async findUser(id: string): Promise<User[]> {
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
      user.urls.map((url) => (url.id = undefined));
    });
    return find;
  }

  async deleteUser(req: DeleteUserDto) {
    const user = await this.getUser(req.userID);
    if (user === null) {
      return { ok: false, msg: "Doesn't exist user" };
    }
    const isOK = await bcrypt.compare(req.password, user.password);
    if (isOK === true) {
      await this.userRepository.delete({ userID: req.userID });
      return { ok: true, msg: 'Deleted' };
    }
    return { ok: false, msg: 'Incorrect password' };
  }
}
