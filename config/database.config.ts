import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT'), 10),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  inject: [ConfigService],
};
