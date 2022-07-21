import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return await this.authService.successLogin(req.body.userID);
  }
}
