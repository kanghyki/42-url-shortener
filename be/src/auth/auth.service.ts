import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';

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
      const payload = { userID: user.userID, sub: user.id };
      const token = this.jwtService.sign(payload);
      return { ok: true, access_token: token };
    }
    return null;
  }
}
