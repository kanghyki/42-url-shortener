import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from './url.dto';
import { URL } from './url.entity';
import { User } from 'src/user/user.entity';
import { HttpService } from '@nestjs/axios';
import * as bcrypt from 'bcrypt';
import * as base62 from 'base62-ts';

@Injectable()
export class URLService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(URL) private urlRepository: Repository<URL>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async calledURL(shortURL: string) {
    const url = await this.urlRepository.findOneBy({ shortURL: shortURL });
    if (url === null) {
      return false;
    }

    url.called += 1;
    await this.urlRepository.save(url);
    return url.originURL;
  }

  async comfirmURLOwnership(userID: string, url: string) {
    const user = await this.userRepository.findOneBy({
      userID: userID,
    });
    const findURL = await this.urlRepository.findOne({
      relations: { user: true },
      where: { shortURL: url },
    });
    if (user === null || findURL === null) {
      return false;
    }
    if (findURL.user.id !== user.id) {
      return false;
    }

    return true;
  }

  async encodeURL(originURL: string): Promise<string> {
    const hash = await bcrypt.hash(originURL, 10);
    let sum;
    for (let i = 0; hash[i]; i++) {
      if (sum === undefined) {
        sum = hash[i].charCodeAt(0);
      }
      sum += hash[i].charCodeAt(0);
    }
    const encoded = base62.encode(parseInt(sum));
    return encoded;
  }

  async createURL(userID: string, body: CreateURLDto): Promise<object> {
    try {
      await this.httpService.axiosRef.get(body.originURL);
    } catch (e) {
      return { ok: false, msg: 'Unhealth Origin URL Server' };
    }
    let shortenURL = await this.encodeURL(body.originURL);
    let count = 0;
    while (
      (await this.urlRepository.findOneBy({
        shortURL: shortenURL,
      })) !== null
    ) {
      if (count > 10) {
        return { ok: false, msg: 'Calculate Error Retry' };
      }
      shortenURL = await this.encodeURL(body.originURL);
      count += 1;
    }

    const user = await this.userRepository.findOneBy({ userID: userID });
    const newURL = this.urlRepository.create(body);
    newURL.shortURL = shortenURL;
    newURL.user = user;
    newURL.called = 0;
    const ret = await this.urlRepository.save(newURL);

    ret.id = undefined;
    ret.user = undefined;
    return { ok: true, msg: 'Create URL', result: ret };
  }

  async deleteURL(userID: string, body: DeleteURLDto) {
    if ((await this.comfirmURLOwnership(userID, body.shortURL)) === false) {
      return { ok: false, msg: 'You have not Ownership' };
    }

    const ret = await this.urlRepository.delete({ shortURL: body.shortURL });
    if (ret.affected > 0) {
      return { ok: true, msg: 'Delete URL' };
    }
    return { ok: false, msg: 'Failed Delete URL' };
  }

  async updateURL(userID: string, body: UpdateURLDto) {
    if ((await this.comfirmURLOwnership(userID, body.shortURL)) === false) {
      return { ok: false, msg: 'You have not Ownership' };
    }
    if (
      (await this.urlRepository.findOneBy({ shortURL: body.newURL })) !== null
    ) {
      return { ok: false, msg: 'Duplicated URL' };
    }

    const findURL = await this.urlRepository.findOneBy({
      shortURL: body.shortURL,
    });
    findURL.shortURL = body.newURL;
    findURL.called = 0;
    const ret = await this.urlRepository.save(findURL);

    ret.id = undefined;
    return { ok: true, msg: 'Update URL' };
  }
}
