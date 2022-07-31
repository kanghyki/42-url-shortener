import { URL } from 'src/entity/url.entity';
import { User } from 'src/entity/user.entity';

export interface JwtUser {
  username: string;
  id: number;
}

export interface JwtUserRequest {
  user: JwtUser;
}

export interface JwtPayload {
  username: string;
  sub: number;
  iat: number;
  exp: number;
}

export interface FTUser {
  id: number;
  login: string;
  email: string;
}

export interface FTUserRequest {
  user: FTUser;
}

export interface LoginToken {
  ok: boolean;
  access_token: string;
}

export interface LoginRequest {
  user: LoginToken;
}

export interface CreateURLResponse {
  ok: boolean;
  msg: string;
  result: URL;
}

export interface GetUserResponse {
  ok: boolean;
  msg: string;
  result: User;
}

export interface DefaultResponse {
  ok: boolean;
  msg: string;
}
