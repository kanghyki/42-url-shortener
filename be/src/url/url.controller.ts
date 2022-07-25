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
import { ReturnDTO } from 'src/dto/return.dto';
import { CreateURLDTO, DeleteURLDTO, UpdateURLDTO } from '../dto/url.dto';
import { URLService } from './url.service';

@Controller('url')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createURL(
    @Req() req: any,
    @Body() body: CreateURLDTO,
  ): Promise<ReturnDTO> {
    return await this.urlService.createURL(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteURL(
    @Req() req: any,
    @Body() body: DeleteURLDTO,
  ): Promise<ReturnDTO> {
    return await this.urlService.deleteURL(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateURL(
    @Req() req: any,
    @Body() body: UpdateURLDTO,
  ): Promise<ReturnDTO> {
    return await this.urlService.updateURL(req.user, body);
  }
}
