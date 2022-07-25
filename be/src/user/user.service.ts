import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Register42UserDTO, UpdateUserDTO } from '../dto/user.dto';
import { ReturnDTO } from 'src/dto/return.dto';
import { FTUser, JwtUser } from 'src/interface/interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(jwtUser: JwtUser): Promise<ReturnDTO> {
    const user: User = await this.userRepository.findOne({
      relations: {
        urls: true,
      },
      where: {
        username: jwtUser.username,
      },
    });
    if (!user) {
      return { ok: false, msg: 'Failed to get user', result: null };
    }
    user.id = undefined;
    user.password = undefined;
    user.urls.map((url) => (url.id = undefined));
    return { ok: true, msg: 'Get User', result: user };
  }

  async createNewUser(
    ftUser: FTUser,
    body: Register42UserDTO,
  ): Promise<ReturnDTO> {
    const user: User = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (user !== null) {
      return { ok: false, msg: 'Already exist account', result: null };
    }
    const hashPW: string = await bcrypt.hash(body.password, 10);
    const newUser: User = this.userRepository.create({
      intraID: ftUser.id,
      intraUsername: ftUser.login,
      email: ftUser.email,
      username: body.username,
      password: hashPW,
    });
    await this.userRepository.save(newUser);
    return { ok: true, msg: 'Create User', result: null };
  }

  async updateUser(jwtUser: JwtUser, body: UpdateUserDTO): Promise<ReturnDTO> {
    const user: User = await this.userRepository.findOneBy({
      username: jwtUser.username,
    });
    if (!user || !(await bcrypt.compare(body.oldPassword, user.password))) {
      return { ok: false, msg: 'Failed to update user', result: null };
    }
    const hashPW: string = await bcrypt.hash(body.newPassword, 10);
    user.password = hashPW;
    await this.userRepository.save(user);
    return { ok: true, msg: 'Update User', result: null };
  }

  async deleteUser(jwtUser: JwtUser): Promise<ReturnDTO> {
    const ret: any = await this.userRepository.delete({
      username: jwtUser.username,
    });
    if (ret.affected <= 0) {
      return { ok: false, msg: 'Failed to delete user', result: null };
    }
    return { ok: true, msg: 'Delete User', result: null };
  }
}
