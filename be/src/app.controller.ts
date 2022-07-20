import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { PasswordGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('auth/login')
  @UseGuards(PasswordGuard)
  async login(@Request() req) {
    return this.authService.getJwtToken();
  }
}
