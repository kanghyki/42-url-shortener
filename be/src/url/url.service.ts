import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { URL } from '../entity/url.entity';
import { User } from 'src/entity/user.entity';
import { CreateURLDto, DeleteURLDto, UpdateURLDto } from '../dto/url.dto';
import { ReturnDto } from 'src/dto/return.dto';
import { JwtUser } from 'src/interface/interface';
import * as bcrypt from 'bcrypt';
import * as base62 from 'base62-ts';

@Injectable()
export class URLService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(URL) private urlRepository: Repository<URL>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async checkURLOwnership(userID: string, url: string) {
    const user = await this.userRepository.findOneBy({
      userID: userID,
    });
    const findURL = await this.urlRepository.findOne({
      relations: { user: true },
      where: { shortURL: url },
    });
    if (user === null || findURL === null || findURL.user.id !== user.id) {
      return false;
    }
    return true;
  }

  async encodeURL(originURL: string): Promise<string> {
    const hash = await bcrypt.hash(originURL, 10);
    if (!hash) {
      return 'error';
    }
    let sum = hash[0].charCodeAt(0);
    for (let i = 1; hash[i]; i++) {
      sum += hash[i].charCodeAt(0);
    }
    const encoded = base62.encode(parseInt(sum));
    return encoded;
  }

  async getShortifiedURL(originURL: string): Promise<string> {
    let shortenURL = await this.encodeURL(originURL);
    let count = 0;
    while (
      (await this.urlRepository.findOneBy({
        shortURL: shortenURL,
      })) !== null
    ) {
      if (count > 10) {
        return '';
      }
      shortenURL = await this.encodeURL(originURL);
      count += 1;
    }
    return shortenURL;
  }

  async checkHealthURL(originURL: string) {
    try {
      await this.httpService.axiosRef.get(originURL);
    } catch (e) {
      return false;
    }
    return true;
  }

  async createURL(jwtUser: JwtUser, body: CreateURLDto): Promise<ReturnDto> {
    if ((await this.checkHealthURL(body.originURL)) === false) {
      return { ok: false, msg: 'Unhealth Origin URL Server', result: null };
    }
    const shortenURL = await this.getShortifiedURL(body.originURL);
    if (shortenURL === '') {
      return { ok: false, msg: 'Shortify Error', result: null };
    }
    const user = await this.userRepository.findOneBy({
      userID: jwtUser.userID,
    });
    const newURL = this.urlRepository.create(body);
    newURL.shortURL = shortenURL;
    newURL.user = user;
    newURL.called = 0;
    const ret = await this.urlRepository.save(newURL);
    ret.id = undefined;
    ret.user = undefined;
    return { ok: true, msg: 'Create URL', result: ret };
  }

  async deleteURL(jwtUser: JwtUser, body: DeleteURLDto): Promise<ReturnDto> {
    if (
      (await this.checkURLOwnership(jwtUser.userID, body.shortURL)) === false
    ) {
      return { ok: false, msg: 'You have not Ownership', result: null };
    }
    const ret = await this.urlRepository.delete({ shortURL: body.shortURL });
    if (ret.affected <= 0) {
      return { ok: false, msg: 'Failed to delete URL', result: null };
    }
    return { ok: true, msg: 'Delete URL', result: null };
  }

  async updateURL(jwtUser: JwtUser, body: UpdateURLDto): Promise<ReturnDto> {
    if (
      (await this.checkURLOwnership(jwtUser.userID, body.shortURL)) === false
    ) {
      return { ok: false, msg: 'You have not Ownership', result: null };
    }
    if (
      (await this.urlRepository.findOneBy({ shortURL: body.newURL })) !== null
    ) {
      return { ok: false, msg: 'Duplicated URL', result: null };
    }
    const findURL = await this.urlRepository.findOneBy({
      shortURL: body.shortURL,
    });
    findURL.shortURL = body.newURL;
    findURL.called = 0;
    const ret = await this.urlRepository.save(findURL);
    ret.id = undefined;
    return { ok: true, msg: 'Update URL', result: null };
  }
}
