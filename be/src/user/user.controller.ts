import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FTAuthGuard } from 'src/auth/strategies/ft-auth.guard';
import { CreateUserDto, Register42UserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findUser(@Req() req: any) {
    return this.userService.getUser(req.user.userID);
  }

  @UseGuards(FTAuthGuard)
  @Post()
  async createNewUser(@Req() req: any, @Body() body: CreateUserDto) {
    if (body.userID === undefined || body.password === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }
    const user = req.user;
    const regi42user: Register42UserDto = {
      intraUniqueID: user.id,
      userID: body.userID,
      password: body.password,
      intraID: user.login,
      email: user.email,
    };
    return await this.userService.createNewUser(regi42user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateUser(@Req() req: any, @Body() body: UpdateUserDto) {
    if (body.password === undefined || body.oldPassword === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }
    const user = req.user;
    body.userID = user.userID;
    return this.userService.UpdateUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Req() req: any) {
    return this.userService.deleteUser(req.user.userID);
  }
}
