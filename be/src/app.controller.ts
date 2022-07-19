import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':su')
  async redirectURL(
    @Param('su') url: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.appService.redirectURL(url, res);
  }
}
