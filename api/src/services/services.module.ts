import { Module } from '@nestjs/common';
import { TransactionalConnection } from './common/transaction-connection.service';
import { UserService } from './user.service';
import { ListQueryBuilder } from './common/list-query-builder';

const services = [UserService, TransactionalConnection, ListQueryBuilder];
@Module({
  imports: [],
  controllers: [],
  providers: services,
  exports: services,
})
export class ServicesModule {}
