import { Type } from 'src/common/types';
import { BaseEntity } from 'src/entities/base-entity';
import { DataSource } from 'typeorm';
export declare class ListQueryBuilder {
    private dataSource;
    constructor(dataSource: DataSource);
    build<T extends BaseEntity>(entity: Type<T>): import("typeorm").SelectQueryBuilder<T>;
}
