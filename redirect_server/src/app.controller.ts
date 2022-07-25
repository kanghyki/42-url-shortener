import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  redirectToMain(@Res() res: Response) {
    return this.appService.redirectToMain(res);
  }

  @Get(':url')
  async redirectURL(@Param('url') url: string, @Res() res: Response) {
    return await this.appService.redirectURL(url, res);
  }
}
