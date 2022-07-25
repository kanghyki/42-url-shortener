import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { FTAuthGuard } from './auth/strategies/ft-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: any) {
    return req.user;
  }

  @UseGuards(FTAuthGuard)
  @Get('auth/42register')
  Register42() {
    return 'Register42';
  }
}
