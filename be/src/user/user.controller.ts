import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtGuard)
  @Get()
  async findUser(@Req() req: any) {
    const JwtUserID = await this.authService.getJwtUserID(
      req.headers.authorization,
    );

    return this.userService.getUser(JwtUserID);
  }

  @Post()
  async createNewUser(@Body() body: CreateUserDto) {
    if (body.userID === undefined || body.password === undefined) {
      return { ok: false, msg: 'Wrong Query' };
    }

    return await this.userService.createNewUser(body);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async deleteUser(@Req() req: any) {
    const JwtUserID = await this.authService.getJwtUserID(
      req.headers.authorization,
    );

    return this.userService.deleteUser(JwtUserID);
  }
}
