import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import refreshJwtConfig from 'config/refreshJwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { TUser } from 'types/user.type';
import { TPayload } from 'types/payload.type';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  // validate user from the database //
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatch = await compare(password, user.hashedPassword);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
  // validate google user from the database //
  async validateOrCreateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;
    return await this.userService.create(googleUser);
  }

  // validate refresh token from the database //
  async validateRefreshToken(userid: string, refreshToken: string) {
    const user = await this.userService.findOne(userid);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid Refresh Token!');

    const refreshTokenMatch = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!refreshTokenMatch)
      throw new UnauthorizedException('Invalid Refresh Token!');

    return user;
  }

  // register function //
  async register(createuserDto: CreateUserDto) {
    const oldUser = await this.userService.findByEmail(createuserDto.email);
    if (oldUser) {
      return new Error('User already exists!');
    }
    return await this.userService.create(createuserDto);
  }

  // login function //
  async login(user: TUser) {
    const payload: TPayload = { sub: user.id, role: user.role };

    // create tokens
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, this.refreshConfig);

    // store token on database
    const hash = await argon2.hash(refresh_token);
    await this.userService.updateHashedRefreshToken(user.id, hash);

    // Sanitize the user object by returning only safe fields
    const { hashedPassword, hashedRefreshToken, ...sanitizedUser } = user;

    return {
      user: sanitizedUser,
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
    await this.userService.updateHashedRefreshToken(userId, null);
  }
}
