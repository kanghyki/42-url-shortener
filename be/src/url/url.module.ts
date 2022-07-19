import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { URLController } from './url.controller';
import { URLMiddleware } from './url.middleware';
import { URLService } from './url.service';
import { URL } from './url.entity';
import { User } from 'src/user/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([URL, User])],
  controllers: [URLController],
  providers: [URLService, AuthService, UserService],
})
export class UrlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(URLMiddleware)
      .forRoutes({ path: '/url', method: RequestMethod.ALL });
  }
}
