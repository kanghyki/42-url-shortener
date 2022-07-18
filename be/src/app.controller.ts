import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async redirectURL(
    @Query('su') url: string,
    @Res() res: Response,
  ): Promise<any> {
    return this.appService.redirectURL(url, res);
  }
}
