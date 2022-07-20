import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    if (username === undefined || pass === undefined) {
      return null;
    }
    const user = await this.userRepository.findOneBy({
      userID: username,
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  getJwtToken() {
    const payload = { userID: 'kanghyki', sub: 1 };
    return { access_token: this.jwtService.sign(payload) };
  }
}
