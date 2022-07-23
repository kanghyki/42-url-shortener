import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { URL } from './entity/url.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(URL) private urlRepository: Repository<URL>) {}

  redirectToMain(res: Response) {
    res.redirect(HttpStatus.TEMPORARY_REDIRECT, process.env.REDIRECT_TO_MAIN);
  }

  async redirectURL(redirURL: string, res: Response) {
    const url = await this.urlRepository.findOneBy({ shortURL: redirURL });
    if (url !== null) {
      console.log(`This url {${url.shortURL}} has been called`);
      url.called += 1;
      await this.urlRepository.save(url);
      res.redirect(HttpStatus.TEMPORARY_REDIRECT, url.originURL);
    } else {
      res.redirect(
        HttpStatus.TEMPORARY_REDIRECT,
        process.env.REDIRECT_TO_ERROR,
      );
    }
  }
}
