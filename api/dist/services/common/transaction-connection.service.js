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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalConnection = void 0;
const common_1 = require("@nestjs/common");
const request_context_1 = require("../../api/request-context");
const constant_1 = require("../../constant");
const typeorm_1 = require("typeorm");
let TransactionalConnection = class TransactionalConnection {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getRepository(ctxOrTarget, maybeTarget) {
        if (ctxOrTarget instanceof request_context_1.RequestContext) {
            const entityManager = ctxOrTarget.req[constant_1.ENTITY_MANAGER_KEY] ?? this.dataSource.manager;
            return entityManager.getRepository(maybeTarget);
        }
        else {
            return this.dataSource.getRepository(ctxOrTarget);
        }
    }
};
exports.TransactionalConnection = TransactionalConnection;
exports.TransactionalConnection = TransactionalConnection = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], TransactionalConnection);
//# sourceMappingURL=transaction-connection.service.js.map