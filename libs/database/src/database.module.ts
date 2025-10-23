import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './constant/database.constant';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          name: process.env.DB_CONTAINER_NAME,
          imports: [
            ConfigModule.forRoot({
              envFilePath: './.env',
            }),
          ],
          useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
            const config =
              DATABASE_CONFIG[configService.getOrThrow('DB_CONTAINER_NAME')];
            // @ts-ignore
            return {
              type: config.type,
              host: configService.getOrThrow<string>('POSTGRES_HOST'),
              port: configService.getOrThrow<number>('POSTGRES_PORT'),
              database: configService.getOrThrow<string>('POSTGRES_DB'),
              username: configService.getOrThrow<string>('POSTGRES_USER'),
              password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
              entities: config.entities,
              synchronize: configService.get<boolean>('DB_SYNC') || true,
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }

  static forEntity(entities: EntityClassOrSchema[]): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forFeature(entities, process.env.DB_CONTAINER_NAME),
      ],
      exports: [TypeOrmModule],
    };
  }
}
