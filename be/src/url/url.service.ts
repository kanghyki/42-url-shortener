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

  async calledURL(shortURL: string) {
    const url = await this.urlRepository.findOneBy({ mappedURL: shortURL });
    if (url !== null) {
      url.called += 1;
      await this.urlRepository.save(url);
      return url.originURL;
    }
    return false;
  }

  async CheckURL(userID: string, URL: string) {
    const user = await this.userRepository.findOneBy({
      userID,
    });
    const url = await this.urlRepository.findOne({
      relations: { user: true },
      where: { mappedURL: URL },
    });
    if (user === null || url === null) {
      return false;
    }
    if (url.user.id === user.id) {
      return true;
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

  async createURL(req: CreateURLDto): Promise<object> {
    const user = await this.userRepository.findOneBy({ userID: req.userID });
    if (req.mappedURL === undefined) {
      //req.mappedURL = await this.encodeURL(req.originURL);
      return { ok: false, msg: 'No mapped URL(will be implemented)' };
    }
    const isExistURL = await this.urlRepository.findOneBy({
      mappedURL: req.mappedURL,
    });
    if (isExistURL !== null) {
      return { ok: false, msg: 'Duplicated URL' };
    }
    const newURL = this.urlRepository.create(req);
    newURL.user = user;
    newURL.called = 0;
    const ret = await this.urlRepository.save(newURL);
    ret.id = undefined;
    ret.user = undefined;
    return { ok: true, result: ret };
  }

  async deleteURL(req: DeleteURLDto) {
    const isOwner = await this.CheckURL(req.userID, req.mappedURL);
    if (isOwner === false) {
      return { ok: false, msg: 'Something went wrong' };
    }
    const ret = await this.urlRepository.delete({ mappedURL: req.mappedURL });
    return { ok: true, result: ret };
  }

  async updateURL(req: UpdateURLDto) {
    const isOwner = await this.CheckURL(req.userID, req.oldMappedURL);
    if (isOwner === false) {
      return { ok: false, msg: 'Something went wrong' };
    }
    const findURL = await this.urlRepository.findOneBy({
      mappedURL: req.oldMappedURL,
    });
    findURL.mappedURL = req.newMappedURL;
    const ret = await this.urlRepository.save(findURL);
    ret.id = undefined;
    return { ok: true, result: ret };
  }
}
