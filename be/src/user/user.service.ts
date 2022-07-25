import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Register42UserDto, UpdateUserDto } from '../dto/user.dto';
import { ReturnDto } from 'src/dto/return.dto';
import { FTUser, JwtUser } from 'src/interface/interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(jwtUser: JwtUser): Promise<ReturnDto> {
    const find = await this.userRepository.find({
      relations: {
        urls: true,
      },
      where: {
        userID: jwtUser.userID,
      },
    });
    find.map((user) => {
      user.id = undefined;
      user.password = undefined;
      user.urls.map((url) => (url.id = undefined));
    });
    if (find.length > 0) {
      return { ok: true, msg: 'Get User', result: find };
    }
    return { ok: false, msg: 'Failed to get user', result: null };
  }

  async createNewUser(
    ftUser: FTUser,
    body: Register42UserDto,
  ): Promise<ReturnDto> {
    const user = await this.userRepository.findOneBy({
      userID: body.userID,
    });
    if (user !== null) {
      return { ok: false, msg: 'Already exist account', result: null };
    }
    const hashPW = await bcrypt.hash(body.password, 10);
    const newUser = this.userRepository.create({
      intraUniqueID: ftUser.id,
      intraID: ftUser.login,
      email: ftUser.email,
      userID: body.userID,
      password: hashPW,
    });
    await this.userRepository.save(newUser);
    return { ok: true, msg: 'Create User', result: null };
  }

  async UpdateUser(jwtUser: JwtUser, body: UpdateUserDto): Promise<ReturnDto> {
    const user = await this.userRepository.findOneBy({
      userID: jwtUser.userID,
    });
    if (!user || !(await bcrypt.compare(body.oldPassword, user.password))) {
      return { ok: false, msg: 'Failed to update user', result: null };
    }
    const hashPW = await bcrypt.hash(body.newPassword, 10);
    user.password = hashPW;
    await this.userRepository.save(user);
    return { ok: true, msg: 'Update User', result: null };
  }

  async deleteUser(jwtUser: JwtUser): Promise<ReturnDto> {
    const ret = await this.userRepository.delete({ userID: jwtUser.userID });
    if (ret.affected <= 0) {
      return { ok: false, msg: 'Failed to delete user', result: null };
    }
    return { ok: true, msg: 'Delete User', result: null };
  }
}
