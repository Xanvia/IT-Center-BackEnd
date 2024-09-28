import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import googleAuthConfig from 'config/googleAuth.config';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { generateRandomPassword } from 'utils/generatePassword';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleAuthConfig.KEY)
    private googleConfig: ConfigType<typeof googleAuthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientID,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log({ profile });
    const user = await this.authService.validateOrCreateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      avatarUrl: profile.photos[0].value,
      hashedPassword: generateRandomPassword(),
    });
    // done(null, user);
    return user;
  }
}
