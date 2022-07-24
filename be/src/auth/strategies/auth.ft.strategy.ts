import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, 'ft') {
  constructor(
    private readonly httpService: HttpService,
    private authService: AuthService,
  ) {
    super({
      authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.FT_UID}&redirect_uri=${process.env.FT_CALLBACK}&response_type=${process.env.FT_RESPONSE}`,
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.FT_UID,
      clientSecret: process.env.FT_SECRET,
      callbackURL: process.env.FT_CALLBACK,
    });
  }

  async validate(accessToken: string) {
    const req = this.httpService.get(process.env.FT_INTRA_ME, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const reqResult = await lastValueFrom(req);
    if (!reqResult) {
      throw new UnauthorizedException();
    }
    return reqResult.data;
  }
}
