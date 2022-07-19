import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UrlModule } from './url/url.module';
import { User } from './user/user.entity';
import { URL } from './url/url.entity';
import { AppService } from './app.service';
import { URLService } from './url/url.service';
import { AuthModule } from './auth/auth.module';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      database: process.env.DATABASE_NAME,
      entities: [User, URL],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([URL, User]),
    UserModule,
    UrlModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, URLService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .exclude(
        { path: 'url', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.GET },
      )
      .forRoutes(AppController);
  }
}
