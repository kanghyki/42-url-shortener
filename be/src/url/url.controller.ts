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
  async createURL(@Req() req, @Body() body: CreateURLDto) {
    const JwtUserID = await this.authService.findJwtOwner(
      req.headers.authorization,
    );
    return this.urlService.createURL(JwtUserID, body);
  }

  @UseGuards(JwtGuard)
  @Delete()
  async deleteURL(@Req() req, @Body() body: DeleteURLDto) {
    const JwtUserID = await this.authService.findJwtOwner(
      req.headers.authorization,
    );
    return this.urlService.deleteURL(JwtUserID, body);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async UpdataURL(@Req() req, @Body() body: UpdateURLDto) {
    const JwtUserID = await this.authService.findJwtOwner(
      req.headers.authorization,
    );
    return this.urlService.updateURL(JwtUserID, body);
  }
}
