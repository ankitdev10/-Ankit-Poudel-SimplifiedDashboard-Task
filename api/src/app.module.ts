import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ApiModule } from "./api/api.module";
import configuration, { AppConfig } from "./config/configuration";
import entities from "./entities";

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_SECRET");
        if (!secret) {
          throw new Error("JWT_SECRET environment variable is not set");
        }
        return {
          global: true,
          secret,
          signOptions: { expiresIn: "1d" },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService<AppConfig, true>) => {
        const dbconfig = config.get("database", { infer: true });
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
