import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async redirectUrl(
    @Query('su') code: string,
    @Res() res: Response,
  ): Promise<any> {
    const url = await this.appService.findURL(code);
    if (url !== null) {
      return res.redirect(HttpStatus.PERMANENT_REDIRECT, url.originURL);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error: No redirect infomation.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
