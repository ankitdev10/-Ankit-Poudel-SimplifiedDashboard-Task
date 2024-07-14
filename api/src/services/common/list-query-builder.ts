import { Injectable } from '@nestjs/common';
import { Type } from 'src/common/types';
import { BaseEntity } from 'src/entities/base-entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ListQueryBuilder {
  constructor(private dataSource: DataSource) {}

  build<T extends BaseEntity>(entity: Type<T>) {
    const repo = this.dataSource.getRepository(entity);
    const alias = entity.name;
    const qb = repo.createQueryBuilder(alias);

    return qb;
  }
}
