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
