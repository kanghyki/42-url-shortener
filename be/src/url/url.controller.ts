import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URLService } from './url.service';

@Controller('url')
export class URLController {
  constructor(
    private readonly urlService: URLService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createURL(@Req() req: any, @Body() body: CreateURLDto) {
    const JwtUserID = await this.authService.getJwtUserID(
      req.headers.authorization,
    );
    if (body.originURL === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }

    return this.urlService.createURL(JwtUserID, body);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async deleteURL(@Req() req: any, @Body() body: DeleteURLDto) {
    const JwtUserID = await this.authService.getJwtUserID(
      req.headers.authorization,
    );
    if (body.shortURL === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }

    return this.urlService.deleteURL(JwtUserID, body);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async UpdataURL(@Req() req: any, @Body() body: UpdateURLDto) {
    const JwtUserID = await this.authService.getJwtUserID(
      req.headers.authorization,
    );
    if (body.newURL === undefined || body.shortURL === undefined) {
      return { ok: false, msg: 'Request Failed' };
    }

    return this.urlService.updateURL(JwtUserID, body);
  }
}
