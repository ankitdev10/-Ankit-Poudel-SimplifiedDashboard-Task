import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ListQueryBuilder } from "./common/list-query-builder";
import { TransactionalConnection } from "./common/transaction-connection.service";
import { UserService } from "./user.service";

const services = [
  UserService,
  TransactionalConnection,
  ListQueryBuilder,
  JwtService,
];
@Module({
  imports: [],
  controllers: [],
  providers: services,
  exports: services,
})
export class ServicesModule {}
