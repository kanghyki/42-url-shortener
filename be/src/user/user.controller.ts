import {
  Body,
  Controller,
  //Request,
  Delete,
  Get,
  Post,
  Query,
  //UseGuards,
} from '@nestjs/common';
import { CreateUserDto, DeleteUserDto } from './user.dto';
import { UserService } from './user.service';
//import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseGuards(LocalAuthGuard)
  //@Post('auth/login')
  //async login(@Request() req) {
  //  return req.user;
  //}

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
      return 'No acc';
    }
    return this.userService.createNewUser(req);
  }

  @Delete()
  deleteUser(@Body() req: DeleteUserDto) {
    return this.userService.deleteUser(req.intraID);
  }
}
