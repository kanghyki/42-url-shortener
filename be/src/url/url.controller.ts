import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateURLResponseDTO, DefaultResponseDTO } from 'src/dto/response.dto';
import { JwtUserRequest } from 'src/interface/interface';
import { CreateURLDTO, DeleteURLDTO, UpdateURLDTO } from '../dto/url.dto';
import { URLService } from './url.service';

@Controller('url')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createURL(
    @Req() req: JwtUserRequest,
    @Body() body: CreateURLDTO,
  ): Promise<CreateURLResponseDTO> {
    return await this.urlService.createURL(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteURL(
    @Req() req: JwtUserRequest,
    @Body() body: DeleteURLDTO,
  ): Promise<DefaultResponseDTO> {
    return await this.urlService.deleteURL(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateURL(
    @Req() req: JwtUserRequest,
    @Body() body: UpdateURLDTO,
  ): Promise<DefaultResponseDTO> {
    return await this.urlService.updateURL(req.user, body);
  }
}
