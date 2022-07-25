import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URLController } from './url.controller';
import { URLService } from './url.service';
import { URL } from '../entity/url.entity';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

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
