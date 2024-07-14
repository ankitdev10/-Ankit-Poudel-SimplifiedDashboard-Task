import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import configuration, { AppConfig } from './config/configuration';
import entities from './entities';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<AppConfig, true>) => {
        const dbconfig = config.get('database', { infer: true });
        console.log({ dbconfig });
        return {
          ...dbconfig,
          entities,
        } as TypeOrmModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
