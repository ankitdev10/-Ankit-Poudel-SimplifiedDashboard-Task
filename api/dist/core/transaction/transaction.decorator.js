"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const common_1 = require("@nestjs/common");
const transaction_interceptor_1 = require("./transaction.interceptor");
const Transaction = () => {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)(transaction_interceptor_1.TransactionInterceptor));
};
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.decorator.js.map