import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'refreshJWT',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: '1d',
  }),
);

// export const jwtConfig: JwtModuleAsyncOptions = {
//   useFactory: async (
//     configService: ConfigService,
//   ): Promise<JwtSignOptions> => ({
//     secret: configService.get<string>('JWT_SECRET'),
//     expiresIn: '1d',
//   }),
//   inject: [ConfigService],
// };
