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
import { AuthService } from 'src/auth/auth.service';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URLService } from './url.service';

@Controller('url')
export class URLController {
  constructor(
    private readonly urlService: URLService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createURL(@Req() req: any, @Body() body: CreateURLDto) {
    if (body.originURL === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }

    return this.urlService.createURL(req.user.uesrID, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteURL(@Req() req: any, @Body() body: DeleteURLDto) {
    if (body.shortURL === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }

    return this.urlService.deleteURL(req.user.userID, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async UpdataURL(@Req() req: any, @Body() body: UpdateURLDto) {
    if (body.newURL === undefined || body.shortURL === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }

    return this.urlService.updateURL(req.user.userID, body);
  }
}
