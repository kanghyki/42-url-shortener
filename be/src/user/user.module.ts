import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [UserController],
  providers: [UserService, JwtService],
})
export class UserModule {}
