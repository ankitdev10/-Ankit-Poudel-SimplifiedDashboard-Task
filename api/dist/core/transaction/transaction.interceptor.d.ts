import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DataSource } from 'typeorm';
export declare class TransactionInterceptor implements NestInterceptor {
    private dataSource;
    constructor(dataSource: DataSource);
    intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>>;
}
