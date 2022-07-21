import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URL } from './url.entity';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
//import * as base62 from 'base62-ts';

@Injectable()
export class URLService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(URL) private urlRepository: Repository<URL>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async calledURL(shortURL: string) {
    const url = await this.urlRepository.findOneBy({ shortURL: shortURL });
    if (url !== null) {
      url.called += 1;
      await this.urlRepository.save(url);
      return url.originURL;
    }
    return false;
  }

  async isURLOwner(userID: string, url: string) {
    const user = await this.userRepository.findOneBy({
      userID,
    });
    const findURL = await this.urlRepository.findOne({
      relations: { user: true },
      where: { shortURL: url },
    });
    if (user === null || findURL === null) {
      return false;
    }
    if (findURL.user.id === user.id) {
      return true;
    }
    return false;
  }

  // TODO: BASE-62 encoding
  async encodeURL(originURL: string): Promise<string> {
    const url_hash = await bcrypt.hash(originURL, 10);
    //const url_62_num = base62.decode(url_hash);
    //const url_62_str = base62.encode(url_62_num);
    return url_hash;
  }

  async createURL(userID: string, body: CreateURLDto): Promise<object> {
    if (body.originURL === undefined || body.shortURL === undefined) {
      return { ok: false, msg: 'Wrong Query' };
    }

    const user = await this.userRepository.findOneBy({ userID: userID });

    try {
      await this.httpService.axiosRef.get(body.originURL);
    } catch (e) {
      return { ok: false, msg: 'Unhealth Origin URL Server' };
    }

    if (body.originURL)
      if (body.shortURL.length <= 0) {
        body.shortURL = await this.encodeURL(body.originURL);
      }
    const isAlreadyExistURL = await this.urlRepository.findOneBy({
      shortURL: body.shortURL,
    });

    if (isAlreadyExistURL !== null) {
      return { ok: false, msg: 'Duplicated URL' };
    }

    const newURL = this.urlRepository.create(body);
    newURL.user = user;
    newURL.called = 0;
    const ret = await this.urlRepository.save(newURL);
    ret.id = undefined;
    ret.user = undefined;
    return { ok: true, result: ret };
  }

  async deleteURL(userID: string, body: DeleteURLDto) {
    if (body.shortURL === undefined) {
      return { ok: false, msg: 'Wrong Query' };
    }

    const isOwner = await this.isURLOwner(userID, body.shortURL);
    if (isOwner === false) {
      return { ok: false, msg: 'Something went wrong' };
    }

    const ret = await this.urlRepository.delete({ shortURL: body.shortURL });

    return { ok: true, result: ret };
  }

  async updateURL(userID: string, body: UpdateURLDto) {
    if (body.newURL === undefined || body.shortURL === undefined) {
      return { ok: false, msg: 'Wrong Query' };
    }

    const isOwner = await this.isURLOwner(userID, body.shortURL);
    if (isOwner === false) {
      return { ok: false, msg: 'Something went wrong' };
    }

    const findURL = await this.urlRepository.findOneBy({
      shortURL: body.shortURL,
    });
    findURL.shortURL = body.newURL;
    findURL.called = 0;

    const ret = await this.urlRepository.save(findURL);
    ret.id = undefined;
    return { ok: true, result: ret };
  }
}
