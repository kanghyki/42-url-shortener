import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto } from './user.dto';
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
  async createNewUser(@Body() req: CreateUserDto) {
    const user = await this.userService.getUser(req.intraID);
    if (user !== null) {
      return false;
    }
    return this.userService.createNewUser(req);
  }

  @Delete()
  deleteUser(@Body() req: DeleteUserDto) {
    return this.userService.deleteUser(req.intraID);
  }
}
