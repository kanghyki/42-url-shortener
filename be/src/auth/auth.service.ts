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

  async successLogin(userID: string) {
    const payload = { userID: userID };
    const token = this.jwtService.sign(payload);
    const user = await this.userRepository.findOneBy({ userID: userID });
    user.token = token;
    await this.userRepository.save(user);
    return { access_token: token };
  }

  async validateJwtToken(token: string) {
    try {
      const ret = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return ret.userID;
    } catch (e) {
      switch (e.message) {
        case 'invalid token':
          throw new HttpException('Invalid token', 401);
        case 'expired token':
          throw new HttpException('Token has been expired', 410);
        default:
          throw new HttpException('Something went wrong', 500);
      }
    }
  }

  async findJwtOwner(tokenString: string) {
    const [type, token] = tokenString.split(/[ ]/);
    const ret = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    return ret.userID;
  }

  async isExistUser(userID: string) {
    const user = await this.userRepository.findOneBy({ userID });
    if (!user) {
      return false;
    }
    return true;
  }
}
