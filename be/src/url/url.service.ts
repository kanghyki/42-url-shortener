import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateURLDto, UpdataURLDto } from './url.dto';
import { URL } from './url.entity';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(URL) private urlRepository: Repository<URL>) {}

  async createURL(url: CreateURLDto) {
    const newURL = this.urlRepository.create(url);
    const ret = await this.urlRepository.save(newURL);
    return ret;
  }

  async deleteURL(urlID: number) {
    const ret = await this.urlRepository.delete({ id: urlID });
    return ret;
  }

  async updateURL(url: UpdataURLDto) {
    const findURL = await this.urlRepository.findOneBy({
      mappedURL: url.oldMappedURL,
    });
    findURL.mappedURL = url.newMappedURL;
    const ret = await this.urlRepository.save(findURL);
    return ret;
  }
}
