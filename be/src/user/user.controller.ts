import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findUser(@Req() req: any) {
    return this.userService.getUser(req.user.userID);
  }

  @Post()
  async createNewUser(@Body() body: CreateUserDto) {
    if (body.userID === undefined || body.password === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }

    return await this.userService.createNewUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Req() req: any) {
    return this.userService.deleteUser(req.user.userID);
  }
}
