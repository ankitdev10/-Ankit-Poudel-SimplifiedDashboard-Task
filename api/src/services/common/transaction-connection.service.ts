import { Injectable } from '@nestjs/common';
import { RequestContext } from 'src/api/request-context';
import { ENTITY_MANAGER_KEY } from 'src/constant';
import {
  DataSource,
  EntityManager,
  ObjectLiteral,
  ObjectType,
  Repository,
} from 'typeorm';

@Injectable()
export class TransactionalConnection {
  /**
   * Creates an instance of TransactionalConnection.
   * @param dataSource The TypeORM DataSource used to obtain the EntityManager.
   */
  constructor(private dataSource: DataSource) {}
  /**
   * Gets the TypeORM repository for the specified entity.
   * If a RequestContext is provided, retrieves the repository from the transactional EntityManager.
   * If no RequestContext is provided, retrieves the repository from the default DataSource.
   * @param ctxOrTarget The RequestContext object or the entity type for which to get the repository.
   * @param maybeTarget The entity type for which to get the repository (required if RequestContext is provided).
   * @returns The TypeORM repository for the specified entity.
   */
  getRepository<Entity extends ObjectLiteral>(
    target: ObjectType<Entity>,
  ): Repository<Entity>;
  getRepository<Entity extends ObjectLiteral>(
    ctx: RequestContext,
    target: ObjectType<Entity>,
  ): Repository<Entity>;
  getRepository<Entity extends ObjectLiteral>(
    ctxOrTarget: RequestContext | ObjectType<Entity>,
    maybeTarget?: ObjectType<Entity>,
  ): Repository<Entity> {
    if (ctxOrTarget instanceof RequestContext) {
      const entityManager: EntityManager =
        (ctxOrTarget.req as any)[ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
      return entityManager.getRepository(maybeTarget!);
    } else {
      return this.dataSource.getRepository(ctxOrTarget);
    }
  }
}
