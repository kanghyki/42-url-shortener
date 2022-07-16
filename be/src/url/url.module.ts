import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlMiddleware } from './url.middleware';
import { UrlService } from './url.service';

@Module({
  imports: [],
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
