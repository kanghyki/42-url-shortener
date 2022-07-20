import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      //secret: process.env.JWT_SECRET,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    //JwtModule.registerAsync({
    //  inject: [ConfigService],
    //  useFactory: (config: ConfigService) => ({
    //    secret: config.get<string>('JWT_SECRET'),
    //    signOptions: { expiresIn: '1d' },
    //  }),
    //}),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
