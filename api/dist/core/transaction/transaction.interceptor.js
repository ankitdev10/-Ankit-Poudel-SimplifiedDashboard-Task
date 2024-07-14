"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionInterceptor = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const constant_1 = require("../../constant");
const typeorm_2 = require("typeorm");
let TransactionInterceptor = class TransactionInterceptor {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async intercept(context, next) {
        let req;
        if (context.getType() === 'graphql') {
            const gqlContext = graphql_1.GqlExecutionContext.create(context).getContext();
            req = gqlContext.req;
        }
        else if (context.getType() === 'http') {
            req = context.switchToHttp().getRequest();
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        req[constant_1.ENTITY_MANAGER_KEY] = queryRunner.manager;
        return next.handle().pipe((0, rxjs_1.concatMap)(async (data) => {
            await queryRunner.commitTransaction();
            return data;
        }), (0, rxjs_1.catchError)(async (err) => {
            await queryRunner.rollbackTransaction();
            throw err;
        }), (0, rxjs_1.finalize)(async () => {
            await queryRunner.release();
        }));
    }
};
exports.TransactionInterceptor = TransactionInterceptor;
exports.TransactionInterceptor = TransactionInterceptor = __decorate([
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], TransactionInterceptor);
//# sourceMappingURL=transaction.interceptor.js.map