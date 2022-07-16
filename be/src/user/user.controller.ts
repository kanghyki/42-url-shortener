import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto, DeleteUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findUser(@Query('id') intraID: string) {
    return this.userService.findUser(intraID);
  }

  @Post()
  createNewUser(@Body() req: CreateUserDto) {
    return this.userService.createNewUser(req);
  }

  @Delete()
  deleteUser(@Body() req: DeleteUserDto) {
    return this.userService.deleteUser(req.intraID);
  }
}
