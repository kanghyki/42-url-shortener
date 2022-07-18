import {
  Body,
  //Request,
  Controller,
  Delete,
  Post,
  Put,
} from '@nestjs/common';
//import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URLService } from './url.service';
//import { UseGuards } from '@nestjs/common';

@Controller('url')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  //@UseGuards(LocalAuthGuard)
  //@Post('auth/login')
  //async login(@Request() req) {
  //  return req.user;
  //}

  @Post()
  async createURL(@Body() req: CreateURLDto) {
    const user = await this.urlService.getUser(req.intraID);
    if (user === null) {
      return false;
    }
    return this.urlService.createURL(user, req);
  }

  @Delete()
  deleteURL(@Body() req: DeleteURLDto) {
    return this.urlService.deleteURL(req);
  }

  @Put()
  UpdataURL(@Body() req: UpdateURLDto) {
    return this.urlService.updateURL(req);
  }
}
