import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { LocalStrategy } from './strategies/auth.local.strategy';
import { JwtStrategy } from './strategies/auth.jwt.strategy';
import { FTStrategy } from './strategies/auth.ft.strategy';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, FTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
