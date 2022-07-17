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
import { URL } from './url/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(URL) private urlRepository: Repository<URL>,
  ) {}

  @Get()
  async redirectUrl(
    @Query('su') code: string,
    @Res() res: Response,
  ): Promise<any> {
    if (code === undefined) {
      // TODO: Redirect to main page
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Error: No Query infomation.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const url = await this.appService.findURL(code);
    if (url !== null) {
      // FIXME: Need refactoring that control repository directly
      url.called += 1;
      res.redirect(HttpStatus.PERMANENT_REDIRECT, url.originURL);
      this.urlRepository.save(url);
    } else {
      // TODO: Redirect to Error page
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
