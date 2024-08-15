import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'config/jwt.config';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtConfig)],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
