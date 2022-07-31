import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Register42UserDTO, UpdateUserDTO } from '../dto/user.dto';
import { FTUser, JwtUser } from 'src/interface/interface';
import * as bcrypt from 'bcrypt';
import { DefaultResponseDTO, GetUserResponseDTO } from 'src/dto/response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUser(
    jwtUser: JwtUser,
  ): Promise<GetUserResponseDTO | DefaultResponseDTO> {
    const user: User = await this.userRepository.findOne({
      relations: {
        urls: true,
      },
      where: {
        username: jwtUser.username,
      },
    });
    if (!user) {
      return { ok: false, msg: 'Failed to get user' };
    }
    user.id = undefined;
    user.password = undefined;
    user.urls.map(url => (url.id = undefined));
    return { ok: true, msg: 'Get User', result: user };
  }

  async createNewUser(
    ftUser: FTUser,
    body: Register42UserDTO,
  ): Promise<DefaultResponseDTO> {
    const user: User = await this.userRepository.findOneBy({
      username: body.username,
    });
    if (user !== null) {
      return { ok: false, msg: 'Already exist account' };
    }
    const newUser: User = this.userRepository.create({
      intraID: ftUser.id,
      intraUsername: ftUser.login,
      email: ftUser.email,
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
    });
    try {
      await this.userRepository.save(newUser);
      return { ok: true, msg: 'Create User' };
    } catch {
      return { ok: false, msg: 'You already have an account' };
    }
  }

  async updateUser(
    jwtUser: JwtUser,
    body: UpdateUserDTO,
  ): Promise<DefaultResponseDTO> {
    const user: User = await this.userRepository.findOneBy({
      username: jwtUser.username,
    });
    if (!user) {
      return { ok: false, msg: 'Failed to update user' };
    }
    if (!(await bcrypt.compare(body.oldPassword, user.password))) {
      return { ok: false, msg: 'Passwords do not match' };
    }
    user.password = await bcrypt.hash(body.newPassword, 10);
    try {
      await this.userRepository.save(user);
      return { ok: true, msg: 'Update User' };
    } catch {
      return {
        ok: false,
        msg: 'Something went wrong while updating the user',
      };
    }
  }

  async deleteUser(jwtUser: JwtUser): Promise<DefaultResponseDTO> {
    try {
      await this.userRepository.delete({
        username: jwtUser.username,
      });
      return { ok: true, msg: 'Delete User' };
    } catch {
      return {
        ok: false,
        msg: 'Something went wrong while deleting the user',
      };
    }
  }
}
