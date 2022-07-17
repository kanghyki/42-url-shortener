import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URL } from './url.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class URLService {
  constructor(
    @InjectRepository(URL) private urlRepository: Repository<URL>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getURL(url: string): Promise<URL> {
    return await this.urlRepository.findOneBy({
      mappedURL: url,
    });
  }

  async getUser(intraID: string): Promise<User> {
    return await this.userRepository.findOneBy({
      intraID: intraID,
    });
  }

  async createURL(user: User, req: CreateURLDto) {
    if (req.mappedURL === undefined) {
      req.mappedURL = 'randomhash';
    }
    const isURL = await this.getURL(req.mappedURL);
    if (isURL !== null) {
      return false;
    }
    const newURL = this.urlRepository.create(req);
    newURL.called = 0;
    const ret = await this.urlRepository.save(newURL);
    newURL.user = user;
    ret.id = undefined;
    return ret;
  }

  async createAnonymousURL(req: CreateURLDto) {
    if (req.mappedURL === undefined) {
      req.mappedURL = 'randomhash';
    }
    const newURL = this.urlRepository.create(req);
    newURL.called = 0;
    const ret = await this.urlRepository.save(newURL);
    ret.id = undefined;
    return ret;
  }

  async deleteURL(req: DeleteURLDto) {
    return await this.urlRepository.delete({ mappedURL: req.mappedURL });
  }

  async updateURL(req: UpdateURLDto) {
    const isURL = await this.getURL(req.newMappedURL);
    if (isURL !== null) {
      return false;
    }
    const findURL = await this.urlRepository.findOneBy({
      mappedURL: req.oldMappedURL,
    });
    findURL.mappedURL = req.newMappedURL;
    const ret = await this.urlRepository.save(findURL);
    ret.id = undefined;
    return ret;
  }
}
