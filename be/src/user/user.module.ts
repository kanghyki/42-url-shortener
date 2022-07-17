import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserMiddleware } from './user.middleware';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '/user', method: RequestMethod.ALL });
  }
}