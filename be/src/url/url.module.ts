import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { UrlMiddleware } from './url.middleware';
import { URL } from './url.entity';
import { UrlService } from './url.service';

@Module({
  imports: [TypeOrmModule.forFeature([URL])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UrlMiddleware)
      .forRoutes({ path: '/url', method: RequestMethod.ALL });
  }
}
