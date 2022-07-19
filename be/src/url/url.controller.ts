import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PasswordGuard } from 'src/auth/auth.guard';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URLService } from './url.service';

@Controller('url')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @Post()
  @UseGuards(PasswordGuard)
  async createURL(@Body() req: CreateURLDto) {
    return this.urlService.createURL(req);
  }

  @Delete()
  @UseGuards(PasswordGuard)
  deleteURL(@Body() req: DeleteURLDto) {
    return this.urlService.deleteURL(req);
  }

  @Patch()
  @UseGuards(PasswordGuard)
  UpdataURL(@Body() req: UpdateURLDto) {
    return this.urlService.updateURL(req);
  }
}
