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
import { FTUserRequest, JwtUserRequest } from 'src/interface/interface';
import { DefaultResponseDTO, GetUserResponseDTO } from 'src/dto/response.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUser(
    @Req() req: JwtUserRequest,
  ): Promise<GetUserResponseDTO | DefaultResponseDTO> {
    return await this.userService.getUser(req.user);
  }

  @UseGuards(FTAuthGuard)
  @Post()
  async createNewUser(
    @Req() req: FTUserRequest,
    @Body() body: CreateUserDTO,
  ): Promise<DefaultResponseDTO> {
    console.log(req);
    return await this.userService.createNewUser(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateUser(
    @Req() req: JwtUserRequest,
    @Body() body: UpdateUserDTO,
  ): Promise<DefaultResponseDTO> {
    return await this.userService.updateUser(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Req() req: JwtUserRequest): Promise<DefaultResponseDTO> {
    return await this.userService.deleteUser(req.user);
  }
}
