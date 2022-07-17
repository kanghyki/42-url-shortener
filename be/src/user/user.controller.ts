import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateURLDto } from 'src/url/url.dto';
import { CreateUserDto, DeleteUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findUser(@Query('id') intraID: string) {
    if (intraID !== undefined) return this.userService.findUser(intraID);
    else return {};
  }

  @Post()
  createNewUser(@Body() req: CreateUserDto) {
    return this.userService.createNewUser(req);
  }

  @Delete()
  deleteUser(@Body() req: DeleteUserDto) {
    return this.userService.deleteUser(req.intraID);
  }

  @Patch()
  createURL(@Query('id') intraID: string, @Body() url: CreateURLDto) {
    return this.userService.createURL(intraID, url);
  }
}
