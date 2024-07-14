"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_connection_service_1 = require("./common/transaction-connection.service");
const user_service_1 = require("./user.service");
const list_query_builder_1 = require("./common/list-query-builder");
const services = [user_service_1.UserService, transaction_connection_service_1.TransactionalConnection, list_query_builder_1.ListQueryBuilder];
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: services,
        exports: services,
    })
], ServicesModule);
//# sourceMappingURL=services.module.js.map