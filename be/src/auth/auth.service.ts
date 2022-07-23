import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({
      userID: username,
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { userID: user.userID };
      const token = this.jwtService.sign(payload);
      return { ok: true, access_token: token };
    }
    return null;
  }
}
