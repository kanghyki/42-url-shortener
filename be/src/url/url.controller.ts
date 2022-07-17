import { Controller, Delete, Post, Put } from '@nestjs/common';
import { CreateURLDto, DeleteURLDto, UpdataURLDto } from './url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  createURL(req: CreateURLDto) {
    return this.urlService.createURL(req);
  }

  @Delete()
  deleteURL(req: DeleteURLDto) {
    return this.urlService.deleteURL(req.urlID);
  }

  @Put()
  UpdataURL(req: UpdataURLDto) {
    return this.urlService.updateURL(req);
  }
}
