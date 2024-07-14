import { RequestContext } from 'src/api/request-context';
import { DataSource, ObjectLiteral, ObjectType, Repository } from 'typeorm';
export declare class TransactionalConnection {
    private dataSource;
    constructor(dataSource: DataSource);
    getRepository<Entity extends ObjectLiteral>(target: ObjectType<Entity>): Repository<Entity>;
    getRepository<Entity extends ObjectLiteral>(ctx: RequestContext, target: ObjectType<Entity>): Repository<Entity>;
}
