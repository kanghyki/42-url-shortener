import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class PasswordGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const ret = await this.authService.validateUser(
      request.body.userID,
      request.body.password,
    );
    if (ret === null) {
      return false;
    }
    return true;
  }
}
