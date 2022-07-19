import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { PasswordGuard } from 'src/auth/auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(PasswordGuard)
  findUser(@Query('id') userID: string) {
    return this.userService.getUser(userID);
  }

  @Post()
  async createNewUser(@Body() req: UserDto) {
    return await this.userService.createNewUser(req);
  }

  @Delete()
  @UseGuards(PasswordGuard)
  deleteUser(@Body() req: UserDto) {
    return this.userService.deleteUser(req);
  }
}
