import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { InjectDataSource } from '@nestjs/typeorm';
import { Observable, catchError, concatMap, finalize } from 'rxjs';
import { ENTITY_MANAGER_KEY } from 'src/constant';
import { DataSource } from 'typeorm';

export class TransactionInterceptor implements NestInterceptor {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    let req: any;

    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      req = gqlContext.req;
    } else if (context.getType() === 'http') {
      req = context.switchToHttp().getRequest();
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    req[ENTITY_MANAGER_KEY] = queryRunner.manager;

    return next.handle().pipe(
      concatMap(async (data) => {
        await queryRunner.commitTransaction();
        return data;
      }),
      catchError(async (err) => {
        await queryRunner.rollbackTransaction();
        throw err;
      }),
      finalize(async () => {
        await queryRunner.release();
      }),
    );
  }
}
