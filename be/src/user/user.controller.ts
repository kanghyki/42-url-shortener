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
import { UserService } from './user.service';
import { ReturnDto } from 'src/dto/return.dto';
import {
  CreateUserDto,
  Register42UserDto,
  UpdateUserDto,
} from '../dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findUser(@Req() req: any): Promise<ReturnDto> {
    return await this.userService.getUser(req.user.userID);
  }

  @UseGuards(FTAuthGuard)
  @Post()
  async createNewUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
  ): Promise<ReturnDto> {
    if (body.userID === undefined || body.password === undefined) {
      return { ok: false, msg: 'Request Failed', result: null };
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
  async UpdateUser(
    @Req() req: any,
    @Body() body: UpdateUserDto,
  ): Promise<ReturnDto> {
    if (body.newPassword === undefined || body.oldPassword === undefined) {
      return { ok: false, msg: 'Request Failed', result: null };
    }
    const user = req.user;
    body.userID = user.userID;
    return this.userService.UpdateUser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Req() req: any): Promise<ReturnDto> {
    return this.userService.deleteUser(req.user.userID);
  }
}
