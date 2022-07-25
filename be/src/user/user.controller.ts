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
import { ReturnDTO } from 'src/dto/return.dto';
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(@Req() req: any): Promise<ReturnDTO> {
    return await this.userService.getUser(req.user);
  }

  @UseGuards(FTAuthGuard)
  @Post()
  async createNewUser(
    @Req() req: any,
    @Body() body: CreateUserDTO,
  ): Promise<ReturnDTO> {
    return await this.userService.createNewUser(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateUser(
    @Req() req: any,
    @Body() body: UpdateUserDTO,
  ): Promise<ReturnDTO> {
    return await this.userService.updateUser(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Req() req: any): Promise<ReturnDTO> {
    return await this.userService.deleteUser(req.user);
  }
}
