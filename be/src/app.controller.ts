import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: any) {
    console.log(req.user);
    return req.user;
  }
}
