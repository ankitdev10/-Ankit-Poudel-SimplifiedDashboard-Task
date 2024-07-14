import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { TransactionInterceptor } from './transaction.interceptor';

export const Transaction = () => {
  return applyDecorators(UseInterceptors(TransactionInterceptor));
};
