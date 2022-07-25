export interface JwtUser {
  username: string;
  id: number;
}

export interface FTUser {
  id: number;
  login: string;
  email: string;
}

export interface LoginToken {
  ok: boolean;
  access_token: string;
}
