import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FTAuthGuard } from './auth/strategies/ft-auth.guard';
import { LoginToken } from './interface/interface';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: any): Promise<LoginToken> {
    return req.user;
  }

  @UseGuards(FTAuthGuard)
  @Get('auth/42register')
  Register42() {
    return 'Register42';
  }
}
