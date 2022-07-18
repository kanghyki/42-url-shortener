import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { URLService } from './url/url.service';

@Injectable()
export class AppService {
  constructor(private readonly urlService: URLService) {}
  async redirectURL(url: string, res: Response) {
    if (url === undefined) {
      res.redirect(HttpStatus.PERMANENT_REDIRECT, process.env.REDIRECT_TO_MAIN);
    }
    const ret = await this.urlService.calledURL(url);
    if (ret !== false) {
      res.redirect(HttpStatus.PERMANENT_REDIRECT, ret);
    } else {
      res.redirect(
        HttpStatus.PERMANENT_REDIRECT,
        process.env.REDIRECT_TO_ERROR,
      );
    }
  }
}
