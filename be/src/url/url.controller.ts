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
import { ReturnDto } from 'src/dto/return.dto';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from '../dto/url.dto';
import { URLService } from './url.service';

@Controller('url')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createURL(
    @Req() req: any,
    @Body() body: CreateURLDto,
  ): Promise<ReturnDto> {
    if (body.originURL === undefined) {
      return { ok: false, msg: 'Request Failed', result: null };
    }
    return await this.urlService.createURL(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteURL(
    @Req() req: any,
    @Body() body: DeleteURLDto,
  ): Promise<ReturnDto> {
    if (body.shortURL === undefined) {
      return { ok: false, msg: 'Request Failed', result: null };
    }
    return await this.urlService.deleteURL(req.user, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdateURL(
    @Req() req: any,
    @Body() body: UpdateURLDto,
  ): Promise<ReturnDto> {
    if (body.newURL === undefined || body.shortURL === undefined) {
      return { ok: false, msg: 'Request Failed', result: null };
    }
    return await this.urlService.updateURL(req.user, body);
  }
}
