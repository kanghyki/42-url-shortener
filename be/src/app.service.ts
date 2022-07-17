import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { URL } from './url/url.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(URL) private readonly urlRepository: Repository<URL>,
  ) {}
  async findURL(code: string): Promise<URL> {
    return await this.urlRepository.findOneBy({ mappedURL: code });
  }
}
