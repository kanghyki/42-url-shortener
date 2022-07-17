import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URLService } from './url.service';

@Controller('url')
export class URLController {
  constructor(private readonly urlService: URLService) {}

  @Post()
  async createURL(@Body() req: CreateURLDto) {
    if (req.intraID === undefined) {
      return this.urlService.createAnonymousURL(req);
    }
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
