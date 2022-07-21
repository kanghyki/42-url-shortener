import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const ret = await this.authService.validateUser(
      request.body.userID,
      request.body.password,
    );
    if (ret === null) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    //const [type, token] = request.headers.authorization.split(' ', 2);
    if (request.headers.authorization !== false) {
      const [type, token] = request.headers.authorization.split(/[ ]/);
      const userID = await this.authService.validateJwtToken(token);
      if (userID !== null) {
        if ((await this.authService.isExistUser(userID)) === true) {
          return true;
        }
      }
    }
    return false;
  }
}
