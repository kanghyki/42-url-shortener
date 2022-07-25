import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { URLController } from './url.controller';
import { URLService } from './url.service';
import { UserService } from 'src/user/user.service';
import { URL } from '../entity/url.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([URL, User]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [URLController],
  providers: [URLService, UserService, JwtService],
})
export class UrlModule {}
