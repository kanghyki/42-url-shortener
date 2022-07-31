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
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';
import {
  DefaultResponse,
  FTUserRequest,
  GetUserResponse,
  JwtUserRequest,
} from 'src/interface/interface';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(@Req() req: JwtUserRequest): Promise<GetUserResponse> {
    return await this.userService.getUser(req.user);
  }

  @UseGuards(FTAuthGuard)
  @Post()
  async createNewUser(
    @Req() req: FTUserRequest,
    @Body() body: CreateUserDTO,
  ): Promise<DefaultResponse> {
    console.log(req);
    return await this.userService.createNewUser(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateUser(
    @Req() req: JwtUserRequest,
    @Body() body: UpdateUserDTO,
  ): Promise<DefaultResponse> {
    return await this.userService.updateUser(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Req() req: JwtUserRequest): Promise<DefaultResponse> {
    return await this.userService.deleteUser(req.user);
  }
}
