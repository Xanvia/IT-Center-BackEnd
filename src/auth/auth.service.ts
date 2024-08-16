import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from 'config/refreshJwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, this.refreshConfig);
    return {
      id: user.userId,
      access_token,
      refresh_token,
    };
  }
}
