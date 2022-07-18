import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UrlModule } from './url/url.module';
import { User } from './user/user.entity';
import { URL } from './url/url.entity';
import { AppService } from './app.service';
import { URLService } from './url/url.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, URLService],
})
export class AppModule {}
