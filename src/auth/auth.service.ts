import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from 'config/refreshJwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { TUser } from 'types/user.type';
import { TPayload } from 'types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  // validate user from the database //
  async validateUser(email: string, pass: string): Promise<TUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.hashedPassword === pass) {
      const { hashedPassword, ...result } = user;
      return result;
    }
    return null;
  }

  // validate refresh token from the database //
  async validateRefreshToken(userid: string, refreshToken: string) {
    const user: TUser = await this.usersService.findOne(userid);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid Refresh Token!');

    const refreshTokenMatch = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatch)
      throw new UnauthorizedException('Invalid Refresh Token!');

    return { id: userid, role: user.role };
  }

  // login function //
  async login(user: TUser) {
    const payload: TPayload = { sub: user.id, role: user.role };

    // create tokens
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, this.refreshConfig);

    // store token on database
    const hash = await argon2.hash(refresh_token);
    await this.usersService.updateHashedRefreshToken(user.id, hash);

    return {
      id: user.id,
      access_token,
      refresh_token,
    };
  }

  // issue new access token //
  async refreshToken(user: TUser) {
    return this.login(user);
  }

  // logout function //
  async logout(userId: string) {
    await this.usersService.updateHashedRefreshToken(userId, null);
  }

  // register function //
  async register(createuserDto: CreateUserDto) {
    return await this.usersService.create(createuserDto);
  }
}