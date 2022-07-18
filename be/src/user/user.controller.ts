import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserDto, DeleteUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findUser(@Query('id') intraID: string) {
    if (intraID === undefined) {
      return {};
    }
    return this.userService.findUser(intraID);
  }

  @Post()
  async createNewUser(@Body() req: UserDto) {
    if (req.isLogin === true) {
      return this.userService.loginUser(req);
    }
    const user = await this.userService.getUser(req.userID);
    if (user !== null) {
      return 'Account already exist';
    }
    return await this.userService.createNewUser(req);
  }

  @Delete()
  deleteUser(@Body() req: DeleteUserDto) {
    return this.userService.deleteUser(req);
  }
}
