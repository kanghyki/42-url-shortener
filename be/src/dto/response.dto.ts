import { URL } from 'src/entity/url.entity';
import { User } from 'src/entity/user.entity';

export interface CreateURLResponseDTO {
  ok: boolean;
  msg: string;
  result: URL;
}

export interface GetUserResponseDTO {
  ok: boolean;
  msg: string;
  result: User;
}

export interface DefaultResponseDTO {
  ok: boolean;
  msg: string;
}
