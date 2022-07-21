import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { URL } from './entity/url.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(URL) private urlRepository: Repository<URL>) {}

  async calledURL(shortURL: string) {
    const url = await this.urlRepository.findOneBy({ shortURL: shortURL });
    if (url !== null) {
      console.log(`This url {${url.shortURL}} has been called`);
      url.called += 1;
      await this.urlRepository.save(url);
      return url.originURL;
    }
    return false;
  }

  async redirectURL(url: string, res: Response) {
    if (url === undefined) {
      res.redirect(HttpStatus.TEMPORARY_REDIRECT, process.env.REDIRECT_TO_MAIN);
    }
    const ret = await this.calledURL(url);
    if (ret !== false) {
      res.redirect(HttpStatus.TEMPORARY_REDIRECT, ret);
    } else {
      res.redirect(
        HttpStatus.TEMPORARY_REDIRECT,
        process.env.REDIRECT_TO_ERROR,
      );
    }
  }
}
