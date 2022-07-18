import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URL } from './url.entity';
import { User } from 'src/user/user.entity';
//import * as bcrypt from 'bcrypt';
//import * as base62 from 'base62-ts';

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

  async getUser(userID: string): Promise<User> {
    return await this.userRepository.findOneBy({
      userID: userID,
    });
  }

  async calledURL(shortURL: string) {
    const url = await this.urlRepository.findOneBy({ mappedURL: shortURL });
    if (url !== null) {
      url.called += 1;
      await this.urlRepository.save(url);
      return url.originURL;
    }
    return false;
  }

  // TODO: BASE-62 encoding
  //async encodeURL(originURL: string): Promise<string> {
  //  const url_hash = await bcrypt.hash(originURL, 3);
  //  const url_64 = Buffer.from(url_hash, 'binary').toString('base64');
  //  const url_62_num = base62.decode(url_64);
  //  const url_62_str = base62.encode(url_62_num);
  //  return url_62_str;
  //}

  async createURL(user: User, req: CreateURLDto) {
    if (req.mappedURL === undefined) {
      //req.mappedURL = await this.encodeURL(req.originURL);
      return 'No mappedURL';
    }
    const isURL = await this.getURL(req.mappedURL);
    if (isURL !== null) {
      return 'dup';
    }
    const newURL = this.urlRepository.create(req);
    newURL.user = user;
    newURL.called = 0;
    const ret = await this.urlRepository.save(newURL);
    ret.id = undefined;
    ret.user = undefined;
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
