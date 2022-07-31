import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { URL } from '../entity/url.entity';
import { User } from 'src/entity/user.entity';
import { CreateURLDTO, DeleteURLDTO, UpdateURLDTO } from '../dto/url.dto';
import { JwtUser } from 'src/interface/interface';
import * as bcrypt from 'bcrypt';
import * as base62 from 'base62-ts';
import { CreateURLResponseDTO, DefaultResponseDTO } from 'src/dto/response.dto';

@Injectable()
export class URLService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(URL) private urlRepository: Repository<URL>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async checkURLOwnership(username: string, url: string) {
    try {
      const user: User = await this.userRepository.findOneBy({
        username: username,
      });
      const findURL: URL = await this.urlRepository.findOne({
        relations: { user: true },
        where: { shortURL: url },
      });
      if (!user || !findURL || findURL.user.id !== user.id) {
        return false;
      }
    } catch {
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
    let shortenURL: string = await this.encodeURL(originURL);
    let count = 0;
    while (
      (await this.urlRepository.findOneBy({ shortURL: shortenURL })) !== null
    ) {
      if (count > 10) {
        shortenURL = '';
        break;
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

  async createURL(
    jwtUser: JwtUser,
    body: CreateURLDTO,
  ): Promise<CreateURLResponseDTO | DefaultResponseDTO> {
    if ((await this.checkHealthURL(body.originURL)) === false) {
      return { ok: false, msg: 'Unhealth Origin URL Server' };
    }
    const shortenURL: string = await this.getShortifiedURL(body.originURL);
    if (shortenURL === '') {
      return { ok: false, msg: 'Shortify Error' };
    }
    const user: User = await this.userRepository.findOneBy({
      username: jwtUser.username,
    });
    const newURL: URL = this.urlRepository.create(body);
    newURL.shortURL = shortenURL;
    newURL.user = user;
    newURL.called = 0;
    try {
      const ret: URL = await this.urlRepository.save(newURL);
      ret.id = undefined;
      ret.user = undefined;
      return { ok: true, msg: 'Create URL', result: ret };
    } catch {
      return {
        ok: false,
        msg: 'Something went wrong while generating the URL',
      };
    }
  }

  async deleteURL(
    jwtUser: JwtUser,
    body: DeleteURLDTO,
  ): Promise<DefaultResponseDTO> {
    if (
      (await this.checkURLOwnership(jwtUser.username, body.shortURL)) === false
    ) {
      return { ok: false, msg: 'You have not Ownership' };
    }
    try {
      await this.urlRepository.delete({
        shortURL: body.shortURL,
      });
      return { ok: true, msg: 'Delete URL' };
    } catch {
      return {
        ok: false,
        msg: 'Something went wrong while deleting the URL',
      };
    }
  }

  async updateURL(
    jwtUser: JwtUser,
    body: UpdateURLDTO,
  ): Promise<DefaultResponseDTO> {
    if (
      (await this.checkURLOwnership(jwtUser.username, body.shortURL)) === false
    ) {
      return { ok: false, msg: 'You have not Ownership' };
    }
    if (
      (await this.urlRepository.findOneBy({ shortURL: body.newURL })) !== null
    ) {
      return { ok: false, msg: 'Duplicated URL' };
    }
    const findURL: URL = await this.urlRepository.findOneBy({
      shortURL: body.shortURL,
    });
    findURL.shortURL = body.newURL;
    findURL.called = 0;
    try {
      const ret: URL = await this.urlRepository.save(findURL);
      ret.id = undefined;
      ret.user = undefined;
      // TODO: result
      return { ok: true, msg: 'Update URL' };
    } catch {
      return {
        ok: false,
        msg: 'Something went wrong while updating the URL',
      };
    }
  }
}
